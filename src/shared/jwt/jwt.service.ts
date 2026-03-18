import { Injectable } from '@nestjs/common';
import { JwtTokenPayload } from 'src/utils/types/token.payload';
import { JwtService as Jwt } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtTokenPurpose } from 'src/utils/enums/jwt-token-purpose';
import { UserRole } from 'src/utils/enums/user.role';
@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: Jwt,
    private config: ConfigService,
  ) {}
  generateToken(
    payload: JwtTokenPayload,
    secret: string,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(payload as object, {
      secret,
      expiresIn: expiresIn as any,
    });
  }
  getUserPayload(user: User, purpose: JwtTokenPurpose): JwtTokenPayload {
    //need to change issuer and audience later
    const issuer = this.config.getOrThrow<string>('JWT_ISSUER');
    const audience = this.config.getOrThrow<string>('JWT_AUDIENCE');
    return {
      id: crypto.randomUUID(),
      userId: parseInt(user.id.toString(), 10),
      name: user.name,
      email: user.email,
      purpose: purpose,
      role: UserRole.USER,
      issuer: issuer,
      audience: audience,
    };
  }
}
