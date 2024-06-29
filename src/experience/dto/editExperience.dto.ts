import { IsOptional, IsString } from 'class-validator';

export class EditExperienceDto {
  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  mode?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  startingMonth?: string;

  @IsString()
  @IsOptional()
  startingYear?: string;

  @IsString()
  @IsOptional()
  endingMonth?: string;

  @IsString()
  @IsOptional()
  endingYear?: string;

  @IsString()
  @IsOptional()
  duration?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
