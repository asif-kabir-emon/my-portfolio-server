import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { JwtGuard } from 'src/auth/auth.guard';
import { AddSkillDto, EditSkillDto } from './dto';

@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addBlog(@Body() body: AddSkillDto) {
    return this.skillService.addSkill(body);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllSkills() {
    return this.skillService.getAllSkills();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getSkillById(@Param('id') id: string) {
    return this.skillService.getSkillById(id);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateSkill(@Param('id') id: string, @Body() body: EditSkillDto) {
    return this.skillService.updateSkill(id, body);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteSkill(@Param('id') id: string) {
    return this.skillService.deleteSkill(id);
  }
}
