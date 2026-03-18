import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength } from 'class-validator';
@InputType()
export class CreateUserDto {
  @Field()
  @IsString()
  @MaxLength(20)
  fullName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @MaxLength(100)
  password: string;
    
}