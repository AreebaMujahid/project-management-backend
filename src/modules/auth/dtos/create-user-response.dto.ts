import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsString, MaxLength } from 'class-validator';
@ObjectType()
export class CreateUserResponseDto {
  @Field(()=> String)
  accessToken: string;

  @Field(()=> String)
  refreshToken: string;
}