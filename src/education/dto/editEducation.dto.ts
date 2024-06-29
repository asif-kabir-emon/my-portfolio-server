import { IsOptional, IsString } from 'class-validator';

export class EditEducationDto {
  @IsString({
    message: 'Institution must be a string',
  })
  @IsOptional()
  institution?: string;

  @IsString({
    message: 'Subject must be a string',
  })
  @IsOptional()
  subject?: string;

  @IsString({
    message: 'Location must be a string',
  })
  @IsOptional()
  location?: string;

  @IsString({
    message: 'Starting year must be a string',
  })
  @IsOptional()
  startingYear?: string;

  @IsString({
    message: 'Passing year must be a string',
  })
  @IsOptional()
  passingYear?: string;

  @IsString({
    message: 'CGPA must be a string',
  })
  @IsOptional()
  cgpa?: string;
}
