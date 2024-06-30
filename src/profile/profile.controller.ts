import { JwtGuard } from 'src/auth/auth.guard';
import { ProfileService } from './profile.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AddProfileDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async addProfile(@Body() dto: AddProfileDto) {
    return this.profileService.addProfile(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getProfile() {
    return this.profileService.getProfile();
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Patch()
  async updateProfile(@Body() dto: AddProfileDto) {
    return this.profileService.updateProfile(dto);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @Post('upload-profile-photo')
  async addProfilePhoto(@UploadedFile() file: Express.Multer.File) {
    return this.profileService.addProfilePhoto(file);
  }

  @HttpCode(HttpStatus.OK)
  @Get('portfolio-information')
  async getPortfolioInformation() {
    return this.profileService.getPortfolioInformation();
  }
}
