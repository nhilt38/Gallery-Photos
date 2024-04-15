import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private service: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      // secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true,
      secretOrKey: 'fubao',
    });
  }

  async validate(payload: any) {
    const user = await this.service.validateUser(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
