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
import { ExperienceService } from './experience.service';
import { JwtGuard } from 'src/auth/guard/auth.guard';
import { AddExperienceDto } from './dto';

@Controller('experience')
export class ExperienceController {
  constructor(private experienceService: ExperienceService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addExperience(@Body() dto: AddExperienceDto) {
    return this.experienceService.addExperience(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllExperiences() {
    return this.experienceService.getAllExperiences();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getExperienceById(@Param('id') id: string) {
    return this.experienceService.getExperienceById(id);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateExperience(
    @Param('id') id: string,
    @Body() dto: AddExperienceDto,
  ) {
    return this.experienceService.updateExperience(id, dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteExperienceById(@Param('id') id: string) {
    return this.experienceService.deleteExperienceById(id);
  }
}
