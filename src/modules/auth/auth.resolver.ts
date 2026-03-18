import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Args } from '@nestjs/graphql';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => CreateUserResponseDto)
    async createAccount(@Args('createUserDto') createUserDto: CreateUserDto) {
        const result = await this.authService.createAccount(createUserDto);
        console.log("resolver result:", result);
        return result;
    }
}
