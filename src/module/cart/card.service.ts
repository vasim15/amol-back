import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  // create a new Empty cart
  createEmptyCart = () => {
    const newCart = {
      total: 0,
      items: [],
    };
    return newCart;
  };

  // create New cart
  async createCartItemToCart(id: string, cartItem: any, currentCart: any) {
    const { total, items }: any = currentCart;
    const newItem = {
      productId: cartItem.productId,
      price: cartItem.price,
      subTotal: cartItem.price,
      quantity: cartItem.quantity,
    };

    items.push(newItem);
    await this.cacheManager.set(id, { total: total + newItem.price, items: items });

    return {
      total: total + newItem.price,
      items: items,
    };
  }

  // delete a items
  async deleteCartItem(id: string, itemIndex: any, currentCart: any) {
    let { total, items }: any = currentCart;

    const productSubTotal = items[itemIndex].total;
    items.splice(itemIndex, 1);
    total = total - productSubTotal;

    await this.cacheManager.set(id, { total: total, items: items });
    return {
      total: total,
      items: items,
    };
  }

  // Get Specif user data
  async getUserCart(id: string) {
    const data = await this.cacheManager.get(id);
    return data;
  }

  // Increase the quantity
  async incrementCartItemQuantity(userId: string, currentCart: any, itemIndex: string) {
    let { total, items } = currentCart;
    const price = items[itemIndex].price;
    items[itemIndex].quantity = items[itemIndex].quantity + 1;
    items[itemIndex].subTotal = items[itemIndex].total + price;
    total = total + price;

    await this.cacheManager.set(userId, {
      total: total,
      items: items,
    });

    return {
      total: total,
      items: items,
    };
  }

  // Decrement
  async decrementCartItemQuantity(userId: any, currentCart: any, itemIndex: string) {
    let { total, items } = currentCart;
    const price = items[itemIndex].price;

    if (items[itemIndex].quantity - 1 === 0) {
      items.splice(itemIndex, 1);
      total = total - price;
    } else {
      items[itemIndex].quantity--;
      items[itemIndex].subTotal = items[itemIndex].subTotal - price;
      total = total - price;
    }

    await this.cacheManager.set(userId, {
      total: total,
      items: items,
    });
    return {
      total: total,
      items: items,
    };
  }

  async deleteCart(userId: string) {
    await this.cacheManager.del(userId);
  }
}
