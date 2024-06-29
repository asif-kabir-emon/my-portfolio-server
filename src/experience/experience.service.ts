import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddExperienceDto } from './dto';

@Injectable()
export class ExperienceService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async addExperience(dto: AddExperienceDto) {
    const experienceData = this.prisma.experience.create({
      data: dto,
    });

    return experienceData;
  }

  async getAllExperiences() {
    const experienceData = this.prisma.experience.findMany();

    return experienceData;
  }

  async getExperienceById(id: string) {
    const experienceData = this.prisma.experience.findUnique({
      where: {
        id,
      },
    });

    return experienceData;
  }

  async updateExperience(id: string, dto: AddExperienceDto) {
    const isExist = await this.prisma.experience.findFirst({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new Error('Experience not found');
    }

    const experienceData = this.prisma.experience.update({
      where: {
        id,
      },
      data: dto,
    });

    return experienceData;
  }

  async deleteExperienceById(id: string) {
    const deletedExperienceData = this.prisma.experience.delete({
      where: {
        id,
      },
    });

    return deletedExperienceData;
  }
}
