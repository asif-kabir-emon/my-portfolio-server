import { IsNotEmpty, IsString } from 'class-validator';

export class AddExperienceDto {
  @IsString({
    message: 'Company should be a string',
  })
  @IsNotEmpty({
    message: 'Company should not be empty',
  })
  company: string;

  @IsString({
    message: 'Position should be a string',
  })
  @IsNotEmpty({
    message: 'Position should not be empty',
  })
  position: string;

  @IsString({
    message: 'Job mode should be a string',
  })
  @IsNotEmpty({
    message: 'Job mode should not be empty',
  })
  mode: string;

  @IsString({
    message: 'Location should be a string',
  })
  @IsNotEmpty({
    message: 'Location should not be empty',
  })
  location: string;

  @IsString({
    message: 'Start Month should be a string',
  })
  @IsNotEmpty({
    message: 'Start Month should not be empty',
  })
  startingMonth: string;

  @IsString({
    message: 'Start Year should be a string',
  })
  @IsNotEmpty({
    message: 'Start Year should not be empty',
  })
  startingYear: string;

  @IsString({
    message: 'End Month should be a string',
  })
  @IsNotEmpty({
    message: 'End Month should not be empty',
  })
  endingMonth: string;

  @IsString({
    message: 'End Year should be a string',
  })
  @IsNotEmpty({
    message: 'End Year should not be empty',
  })
  endingYear: string;

  @IsString({
    message: 'Duration should be a string',
  })
  @IsNotEmpty({
    message: 'Duration should not be empty',
  })
  duration: string;

  @IsString({
    message: 'Description should be a string',
  })
  @IsNotEmpty({
    message: 'Description should not be empty',
  })
  description: string;
}
