import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '4KNSXLoMdxB4k6zrvm0y8nSblfsf/FGrz6XgTcQ7se4=',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.email };
  }
}
