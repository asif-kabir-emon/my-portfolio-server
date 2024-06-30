import { IsNotEmpty, IsString } from 'class-validator';

export class AddBlogDto {
  @IsString({
    message: 'Title must be a string',
  })
  @IsNotEmpty({
    message: 'Title is required',
  })
  title: string;

  @IsString({
    message: 'Content must be a string',
  })
  @IsNotEmpty({
    message: 'Content is required',
  })
  content: string;
}
