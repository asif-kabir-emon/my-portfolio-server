import { LoginDto } from './dto/login.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const isUserExist = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (isUserExist) {
      throw new ForbiddenException('User already exists with this email.');
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      parseInt(this.config.get('BCRYPT_SALT_ROUNDS')),
    );

    const result = await this.prisma.$transaction(async (tsc) => {
      const user = await tsc.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          name: dto.name,
        },
      });

      return user;
    });

    return result;
  }

  async login(dto: LoginDto) {
    const userData = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (!userData) {
      throw new ForbiddenException('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      userData.password,
    );
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid Credentials.');
    }

    const jwtPayload = { email: userData.email, sub: userData.id };
    const token = this.jwt.sign(jwtPayload, {
      expiresIn: '1h',
      secret: this.config.get<string>('JWT_SECRET'),
    });

    return { token };
  }
}
