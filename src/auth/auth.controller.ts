import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('')
  @ApiBody({ schema: { example: { email: '', password: '' } } })
  async login(@Body('email') email: string, @Body('password') password: string) {
    const token = await this.authService.login(email, password);
    return { token };
  }
}
