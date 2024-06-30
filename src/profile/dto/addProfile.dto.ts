import { IsNotEmpty, IsString } from 'class-validator';

export class AddProfileDto {
  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsString({
    message: 'Profession must be a string',
  })
  @IsNotEmpty({
    message: 'Profession is required',
  })
  profession: string;

  @IsString({
    message: 'About must be a string',
  })
  @IsNotEmpty({
    message: 'About is required',
  })
  about: string;

  @IsString({
    message: 'Location must be a string',
  })
  @IsNotEmpty({
    message: 'Location is required',
  })
  location: string;

  @IsString({
    message: 'Resume url must be a string',
  })
  @IsNotEmpty({
    message: 'Resume url is required',
  })
  resumeUrl: string;
}
