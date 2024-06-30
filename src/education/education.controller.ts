import { JwtGuard } from '../auth/guard/auth.guard';
import { AddEducationDto, EditEducationDto } from './dto';
import { EducationService } from './education.service';
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

@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addEducationalQualification(@Body() dto: AddEducationDto) {
    return await this.educationService.addEducationalQualification(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllEducationalQualifications() {
    return await this.educationService.getAllEducationalQualifications();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getEducationalQualificationsById(@Param('id') id: string) {
    return await this.educationService.getEducationalQualificationsById(id);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async updateEducationalQualificationById(
    @Param('id') id: string,
    @Body() dto: EditEducationDto,
  ) {
    return await this.educationService.updateEducationalQualificationById(
      id,
      dto,
    );
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteEducationalQualificationById(@Param('id') id: string) {
    return await this.educationService.deleteEducationalQualificationById(id);
  }
}
