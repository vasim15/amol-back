import { Body, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/constant/role';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT.SECRET_KEY,
      signOptions: { expiresIn: JWT.EXP_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
