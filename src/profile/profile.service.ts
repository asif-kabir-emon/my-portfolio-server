import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddProfileDto } from './dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addProfile(dto: AddProfileDto) {
    const profileData = this.prisma.profile.create({
      data: dto,
    });

    return profileData;
  }

  async getProfile() {
    return this.prisma.profile.findFirst();
  }

  async updateProfile(dto: AddProfileDto) {
    let result: any = null;
    const profileData = await this.prisma.profile.findFirst();

    if (profileData) {
      result = this.prisma.profile.update({
        where: {
          id: profileData.id,
        },
        data: {
          ...dto,
        },
      });
    } else {
      result = this.prisma.profile.create({
        data: dto,
      });
    }

    return result;
  }

  async addProfilePhoto(file: Express.Multer.File) {
    const profileData = await this.prisma.profile.findFirst();

    if (profileData) {
      try {
        const image = await this.cloudinaryService.uploadImage(file);
        const updatedProfile = await this.prisma.profile.update({
          where: {
            id: profileData.id,
          },
          data: {
            image: image.secure_url,
          },
        });

        return updatedProfile;
      } catch (error) {
        console.log('failed to upload image to cloudinary');
        return null;
      }
    } else {
      return null;
    }
  }

  async getPortfolioInformation() {
    const profileData = await this.prisma.profile.findFirst();
    const contactData = await this.prisma.contact.findFirst({});
    const educationData = await this.prisma.education.findMany({});
    const experienceData = await this.prisma.experience.findMany({});
    const blogData = await this.prisma.blog.findMany({});
    const skillData = await this.prisma.skill.findMany({});
    const projectData = await this.prisma.project.findMany({});

    const result = {
      profile: profileData,
      contactInformation: contactData,
      education: educationData,
      experience: experienceData,
      blog: blogData,
      skill: skillData,
      project: projectData,
    };

    return result;
  }
}
