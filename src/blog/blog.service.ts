import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddBlogDto, EditBlogDto } from './dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addBlog(file: Express.Multer.File, data: AddBlogDto) {
    let imageUrl: string = '';

    if (file) {
      try {
        const image = await this.cloudinaryService.uploadImage(file);
        imageUrl = image.secure_url;
      } catch (error) {
        console.log('failed to upload image to cloudinary');
      }
    }

    const blogData = await this.prisma.blog.create({
      data: {
        imageUrl: imageUrl,
        title: data.title,
        content: data.content,
      },
    });

    return blogData;
  }

  async getAllBlogs() {
    return this.prisma.blog.findMany();
  }

  async getBlogById(id: string) {
    return this.prisma.blog.findUnique({
      where: {
        id,
      },
    });
  }

  async updateBlog(
    id: string,
    data: EditBlogDto,
    file: Express.Multer.File | null,
  ) {
    const isExist = await this.prisma.blog.findUnique({
      where: {
        id,
      },
    });

    if (!isExist) {
      throw new Error('Blog not found');
    }

    let imageUrl: string = '';

    if (file) {
      try {
        const image = await this.cloudinaryService.uploadImage(file);
        imageUrl = image.secure_url;
      } catch (error) {
        console.log('failed to upload image to cloudinary');
      }
    }

    const updatedBlogData = this.prisma.blog.update({
      where: {
        id,
      },
      data: {
        ...data,
        imageUrl: imageUrl,
      },
    });

    return updatedBlogData;
  }

  async deleteBlog(id: string) {
    const deletedBlogData = this.prisma.blog.delete({
      where: {
        id,
      },
    });

    return deletedBlogData;
  }
}
