import { IsOptional, IsString } from 'class-validator';

export class EditSkillDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  level?: string;
}
