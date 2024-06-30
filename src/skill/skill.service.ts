import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddSkillDto, EditSkillDto } from './dto';

@Injectable()
export class SkillService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async addSkill(dto: AddSkillDto) {
    const skillData = this.prisma.skill.create({
      data: dto,
    });

    return skillData;
  }

  async getAllSkills() {
    const skills = this.prisma.skill.findMany();
    return skills;
  }

  async getSkillById(id: string) {
    const skill = this.prisma.skill.findUnique({
      where: { id },
    });

    return skill;
  }

  async updateSkill(id: string, dto: EditSkillDto) {
    const isExist = await this.prisma.skill.findUnique({
      where: { id },
    });

    if (!isExist) {
      throw new Error('Skill not found');
    }

    const updatedSkill = this.prisma.skill.update({
      where: { id },
      data: dto,
    });

    return updatedSkill;
  }

  async deleteSkill(id: string) {
    const deletedSkill = this.prisma.skill.delete({
      where: { id },
    });

    return deletedSkill;
  }
}
