import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtTokenPayload } from 'src/utils/types/token.payload';
//Jwt Strategy :
// 1- automatically do extract token from header
// 2- verify the token
// 3- calls validate method in jwtstrategy
// 4- attach user payload to the request
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }
  async validate(payload: JwtTokenPayload) {
    return { id: payload.id, userId: payload.userId, name:payload.name , email:payload.email, role: payload.role , purpose: payload.purpose , issuer: payload.issuer, audience: payload.audience };
  }
}