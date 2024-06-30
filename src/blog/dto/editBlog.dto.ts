import { IsOptional, IsString } from 'class-validator';

export class EditBlogDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}
