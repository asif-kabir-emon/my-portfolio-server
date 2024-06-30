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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async addProject(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') body: string,
  ) {
    const parsedBody = JSON.parse(body);
    return this.projectService.addProject(file, parsedBody);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllProjects() {
    return this.projectService.getAllProjects();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getProjectById(@Param('id') id: string) {
    return this.projectService.getProjectById(id);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async updateProject(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('data') body: string,
  ) {
    const parsedBody = JSON.parse(body);
    return this.projectService.updateProject(file, id, parsedBody);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }
}
