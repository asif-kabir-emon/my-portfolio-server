import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddSkillDto {
  @IsString({
    message: 'Name must be a string',
  })
  @IsNotEmpty({
    message: 'Name is required',
  })
  name: string;

  @IsString({
    message: 'Level must be a string',
  })
  @IsNotEmpty({
    message: 'Level is required',
  })
  level: string;

  @IsString({
    message: 'Category must be a string',
  })
  @IsOptional()
  category?: string;
}
