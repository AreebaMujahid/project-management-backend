import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthService } from 'src/shared/jwt/jwt.service';
import { JwtTokenPurpose } from 'src/utils/enums/jwt-token-purpose';
import { ConfigService } from '@nestjs/config';
import { CreateUserResponseDto } from './dtos/create-user-response.dto';
@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>,
    private jwtAuthService: JwtAuthService,
    private config: ConfigService,) {}

    private generateAuthTokens(user: User) {
    //Create payload from user object first
    const payload = this.jwtAuthService.getUserPayload(
      user,
      JwtTokenPurpose.AUTH,
    );
    const expiry = this.config.getOrThrow<string>('JWT_ACCESS_EXPIRY');
    const secret = this.config.getOrThrow<string>('JWT_ACCESS_SECRET');
    const accessToken = this.jwtAuthService.generateToken(
      payload,
      secret,
      expiry,
    );
    const refreshExpiry = this.config.getOrThrow<string>('JWT_REFRESH_EXPIRY');
    const refreshSecret = this.config.getOrThrow<string>('JWT_REFRESH_SECRET');
    const refreshToken = this.jwtAuthService.generateToken(
      payload,
      refreshSecret,
      refreshExpiry,
    );
    console.log(accessToken);
    console.log(refreshToken);
    return { accessToken, refreshToken };
    }

    async createAccount(createUserDto: CreateUserDto) {
    const normalizedEmail = createUserDto.email.toLowerCase();
    const existingUser = await this.userRepository.findOne({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({
      name: createUserDto.fullName,
      email: normalizedEmail,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);
    const tokens = this.generateAuthTokens(savedUser);
    console.log("tokens in create user api: ", tokens);
    // Ensure tokens exist
    if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
    throw new Error('Failed to generate tokens');
    }
    // Return a proper DTO instance
    return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    };
    }
}
