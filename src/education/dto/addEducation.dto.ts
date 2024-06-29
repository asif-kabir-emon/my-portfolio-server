import { IsNotEmpty, IsString } from 'class-validator';

export class AddEducationDto {
  @IsString({
    message: 'Institution must be a string',
  })
  @IsNotEmpty({
    message: 'Institution is required',
  })
  institution: string;

  @IsString({
    message: 'Subject must be a string',
  })
  @IsNotEmpty({
    message: 'Subject is required',
  })
  subject: string;

  @IsString({
    message: 'Location must be a string',
  })
  @IsNotEmpty({
    message: 'Location is required',
  })
  location: string;

  @IsString({
    message: 'Starting year must be a string',
  })
  @IsNotEmpty({
    message: 'Starting year is required',
  })
  startingYear: string;

  @IsString({
    message: 'Passing year must be a string',
  })
  @IsNotEmpty({
    message: 'Passing year is required',
  })
  passingYear: string;

  @IsString({
    message: 'CGPA must be a string',
  })
  @IsNotEmpty({
    message: 'CGPA is required',
  })
  cgpa: string;
}
