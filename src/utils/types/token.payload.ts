import { JwtTokenPurpose } from '../enums/jwt-token-purpose';
import { UserRole } from '../enums/user.role';
export type JwtTokenPayload = {
  id: string;
  userId: number;
  name: string;
  email: string;
  role: UserRole,
  purpose: JwtTokenPurpose;
  issuer: string;
  audience: string;
};
