import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddProjectDto, EditProjectDto } from './dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addProject(file: Express.Multer.File, dto: AddProjectDto) {
    let imageUrl: string = '';

    if (file) {
      try {
        const image = await this.cloudinaryService.uploadImage(file);
        imageUrl = image.secure_url;
      } catch (error) {
        console.log('failed to upload image to cloudinary');
      }
    }
    const projectData = this.prisma.project.create({
      data: {
        ...dto,
        imageUrl,
      },
    });

    return projectData;
  }

  async getAllProjects() {
    return this.prisma.project.findMany();
  }

  async getProjectById(id: string) {
    return this.prisma.project.findUnique({
      where: {
        id,
      },
    });
  }

  async updateProject(
    file: Express.Multer.File | null,
    id: string,
    dto: EditProjectDto,
  ) {
    const isExist = await this.prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new Error('Project not found');
    }

    let imageUrl: string = isExist.imageUrl;

    if (file) {
      try {
        const image = await this.cloudinaryService.uploadImage(file);
        imageUrl = image.secure_url;
      } catch (error) {
        console.log('failed to upload image to cloudinary');
      }
    }

    const updatedProject = this.prisma.project.update({
      where: {
        id,
      },
      data: {
        ...dto,
        imageUrl,
      },
    });

    return updatedProject;
  }

  async deleteProject(id: string) {
    const deletedProjectData = this.prisma.project.delete({
      where: {
        id,
      },
    });

    return deletedProjectData;
  }
}
