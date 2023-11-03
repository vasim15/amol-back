import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from './card.service';
import { CartController } from './cart.controller';

@Module({
  providers: [PrismaService, CartService],
  controllers: [CartController],
})
export class CartModule {}
