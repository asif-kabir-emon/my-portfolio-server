import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { JwtGuard } from 'src/auth/auth.guard';
import { AddExperienceDto } from './dto';

@Controller('experience')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  @UseGuards(JwtGuard)
  @Post()
  async addExperience(@Body() dto: AddExperienceDto) {
    return this.experienceService.addExperience(dto);
  }

  @Get()
  async getAllExperiences() {
    return this.experienceService.getAllExperiences();
  }

  @Get(':id')
  async getExperienceById(@Param('id') id: string) {
    return this.experienceService.getExperienceById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateExperience(
    @Param('id') id: string,
    @Body() dto: AddExperienceDto,
  ) {
    return this.experienceService.updateExperience(id, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteExperienceById(@Param('id') id: string) {
    return this.experienceService.deleteExperienceById(id);
  }
}
