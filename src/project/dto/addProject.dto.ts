import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddProjectDto {
  @IsString({
    message: 'Title must be a string',
  })
  @IsNotEmpty({
    message: 'Title is required',
  })
  title: string;

  @IsString({
    message: 'Description must be a string',
  })
  @IsOptional()
  description?: string;

  @IsString({
    message: 'TechStack must be a string',
  })
  @IsOptional()
  liveSiteUrl?: string;

  @IsString({
    message: 'VideoUrl must be a string',
  })
  @IsOptional()
  videoUrl?: string;

  @IsString({
    message: 'GithubServerSideUrl must be a string',
  })
  @IsOptional()
  githubServerSideUrl?: string;

  @IsString({
    message: 'GithubClientSideUrl must be a string',
  })
  @IsOptional()
  githubClientSideUrl?: string;
}
