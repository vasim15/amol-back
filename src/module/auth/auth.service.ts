import { UserLogin, UserRegister, UserRegisterViaGoogle, OtpRequest, ResetPassword, AccountStatusCheck } from 'src/dto/auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import { sendMail, generateOTP } from 'src/services/Email.services';
import { Body, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ROLE } from 'src/constant/role';
import { OK, NOT_FOUND, BAD_REQUEST } from 'http-status';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache, private jwtService: JwtService) {}

  // user login
  async login(data: UserLogin) {
    if (data.role === ROLE.ADMIN) {
      const user = await this.prisma.user.findUnique({
        where: {
          email: data.email,
          password: data.password,
        },
      });
      if (!user) {
        return {
          message: 'Please create your account first',
          statusCode: NOT_FOUND,
        };
      }
      return {
        message: 'You have logged in ',
        statusCode: OK,
        data: {
          accessToken: await this.jwtService.signAsync({
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          }),
        },
      };
    }

    if (data.role === ROLE.STUDENT) {
      if (data.mobileNumber) {
        // const otp: number | string = generateOTP();
        const otp = 1234;
        this.cacheManager.set(data.mobileNumber, otp, 18000);
        // const options = { toEmail: data.email, subject: 'OTP SEND', text: `Your OTP is: ${otp}` };
        // await sendMail(options);
        return {
          message: 'Otp sent successfully on your mailbox',
          statusCode: OK,
          status: true,
        };
      } else if (data.google_id) {
        const user = await this.prisma.user.findUnique({
          where: {
            email: data.email,
            google_id: data.google_id,
          },
        });
        if (!user) {
          return {
            message: 'Please create your account first',
            statusCode: NOT_FOUND,
            status: false,
          };
        }
        return {
          message: 'You have successfully via  a Google',
          statusCode: OK,
          status: true,
          data: {
            accessToken: this.jwtService.sign({
              userId: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
            }),
          },
        };
      }
    }
  }
  // otp verification
  async otpVerification(@Body() data: OtpRequest) {
    const savedOtp = await this.cacheManager.get(data.mobileNumber); // Retrieve OTP from cache
    console.log(savedOtp);
    if (savedOtp == data.otp) {
      const user = await this.prisma.user.findUnique({
        where: {
          mobileNumber: data.mobileNumber,
        },
      });
      return {
        message: 'You have successfully signed',
        statusCode: OK,
        status: true,
        data: {
          accessToken: this.jwtService.sign({
            userId: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          }),
        },
      };
    } else {
      return {
        message: 'Invalid OTP',
        statusCode: BAD_REQUEST,
        status: false,
      };
    }
  }

  //  Register User vi Email Address
  async register(data: UserRegister) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
        mobileNumber: data.mobileNumber,
      },
    });

    if (user) {
      return {
        message: 'Sorry, that email address is already associated with an account.',
        statusCode: BAD_REQUEST,
      };
    }
    const new_user = await this.prisma.user.create({
      data: data,
    });
    return {
      message: 'User has been created',
      statusCode: OK,
    };
  }

  // Social Register
  async socialRegister(data: UserRegisterViaGoogle) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
        google_id: data.google_id,
      },
    });

    if (user) {
      return {
        message: 'User is already have account via google',
        statusCode: BAD_REQUEST,
      };
    }

    const new_user = await this.prisma.user.create({
      data: data,
    });
    return {
      message: 'User has been created',
      statusCode: OK,
    };
  }

  // Reset password for admin
  async resetPassword(data: ResetPassword) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        message: 'User not found',
        statusCode: NOT_FOUND,
      };
    }

    if (data.password !== data.oldPassword) {
      return {
        message: 'Password is not be same as old password',
        statusCode: BAD_REQUEST,
      };
    }
  }

  // check user account status
  async accountStatusCheck(data: AccountStatusCheck) {
    const user = await this.prisma.user.findUnique({
      where: data,
    });

    if (!user) {
      return {
        message: 'User Not Found',
        statusCode: NOT_FOUND,
        data: {
          status: true,
        },
      };
    }
    return {
      message: 'User already have a account',
      statusCode: BAD_REQUEST,
      data: {
        status: false,
      },
    };
  }

  async cheekTokenService() {
    return this.jwtService.sign({
      email: 'ritik@gmail.com,',
      name: 'ritik@gmail.com,',
    });
  }
  async validateToken(data: string) {
    return this.jwtService.sign({
      email: 'ritik@gmail.com,',
      name: 'ritik@gmail.com,',
    });
  }
}
