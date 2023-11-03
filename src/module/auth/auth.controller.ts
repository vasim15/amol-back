import { Body, Controller, Param, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountStatusCheck, OtpRequest, ResetPassword, UserLogin, UserRegister, UserRegisterViaGoogle } from 'src/dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() loginData: UserLogin) {
    // const { message, statusCode, data }: any = await this.authService.login(loginData);
    // console.log(message, statusCode, data);
    // ApiResponse(res, message, statusCode, data);
    return this.authService.login(loginData);
  }

  @Post('register')
  register(@Body() registerData: UserRegister) {
    return this.authService.register(registerData);
  }

  @Post('social-register')
  socialRegister(@Body() registerData: UserRegisterViaGoogle) {
    return this.authService.socialRegister(registerData);
  }

  @Post('verify-otp')
  otpVerification(@Body() otpData: OtpRequest) {
    return this.authService.otpVerification(otpData);
  }

  @Post('user/account-status')
  checkUserStatus(@Body() data: AccountStatusCheck) {
    return this.authService.accountStatusCheck(data);
  }

  @Post('resetPassword')
  resetPassword(@Body() resetPassword: ResetPassword) {
    return this.authService.resetPassword(resetPassword);
  }

  @Get('token')
  cheekTokenService() {
    return this.authService.cheekTokenService();
  }
}
