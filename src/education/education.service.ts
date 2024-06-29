import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AddEducationDto, EditEducationDto } from './dto';

@Injectable()
export class EducationService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async addEducationalQualification(dto: AddEducationDto) {
    const educationData = this.prisma.education.create({
      data: dto,
    });
    return educationData;
  }

  async getAllEducationalQualifications() {
    const educations = this.prisma.education.findMany();
    return educations;
  }

  async getEducationalQualificationsById(id: string) {
    const education = this.prisma.education.findFirst({
      where: { id },
    });
    return education;
  }

  async updateEducationalQualificationById(id: string, dto: EditEducationDto) {
    const isExist = await this.prisma.education.findFirst({
      where: { id },
    });

    if (!isExist) {
      throw new Error('Education not found');
    }

    const updatedEducationData = this.prisma.education.update({
      where: { id },
      data: dto,
    });

    return updatedEducationData;
  }

  async deleteEducationalQualificationById(id: string) {
    const education = this.prisma.education.delete({
      where: { id },
    });
    return education;
  }
}
