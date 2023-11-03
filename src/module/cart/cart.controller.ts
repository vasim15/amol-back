import { Body, Controller, Get, Delete, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from './card.service';

@Controller('cart')
@ApiTags('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  //create  a new Cart
  @Get('empty')
  createEmpty() {
    return this.cartService.createEmptyCart();
  }

  //add a new item to the cart
  @Post('add-item/:userId')
  addItem(@Param('userId') userId: string, @Body() cartInfo: any) {
    return this.cartService.createCartItemToCart(userId, cartInfo.cartItem, cartInfo.currentCart);
  }

  // remove cart item from cart
  @Delete('remove-item/:userId')
  deleteItem(@Param('userId') userId: string, @Body() cartInfo: any) {
    return this.cartService.deleteCartItem(userId, cartInfo.itemIndex, cartInfo.currentCart);
  }

  // get a user cart item
  @Get(':userId')
  getUserCart(@Param('userId') userId: string) {
    return this.cartService.getUserCart(userId);
  }

  // delete a user cart
  @Delete(':userId')
  deleteCart(@Param('userId') userId: string) {
    return this.cartService.deleteCart(userId);
  }

  // decrease a user cart by decrement
  @Delete('/dec/:userId')
  decrementCartItemQuantity(@Param('userId') userId: string, @Body('cartInfo') cartInfo: any) {
    return this.cartService.decrementCartItemQuantity(userId, cartInfo.currentCart, cartInfo.itemIndex);
  }

  // Increment cart item quantity
  @Delete('/inc/:userId')
  incrementCartItemQuantity(@Param('userId') userId: string, @Body('cartInfo') cartInfo: any) {
    return this.cartService.incrementCartItemQuantity(userId, cartInfo.currentCart, cartInfo.itemIndex);
  }
}
