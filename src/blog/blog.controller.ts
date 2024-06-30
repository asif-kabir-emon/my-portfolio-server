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
import { BlogService } from './blog.service';
import { JwtGuard } from 'src/auth/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async addBlog(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') body: string,
  ) {
    const parsedBody = JSON.parse(body) as { title: string; content: string };
    return this.blogService.addBlog(file, parsedBody);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  async updateBlog(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('data') body: string,
  ) {
    const parsedBody = JSON.parse(body);
    return this.blogService.updateBlog(id, file, parsedBody);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }
}
