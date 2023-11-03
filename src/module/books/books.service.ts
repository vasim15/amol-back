import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBookDTO } from 'src/dto/book.dto';

export class BuyBookDto {
  subtotalPrice: number;
  totalPrice: number;
  couponCode?: string;
  shippingAddress: string;
  userId: string;
  books: {
    bookId: string;
    quantity: number;
  }[];
}

@Injectable({})
export class BooksServices {
  constructor(private prisma: PrismaService) {}

  //Get all books data
  async getAllBooks() {
    const books = await this.prisma.books.findMany();
    return books;
  }

  // Create a new book
  async createBook(book: any) {
    return this.prisma.books.create({
      data: {
        title: book.title,
        author: book.author,
        aboutAuthor: book.aboutAuthor,
        shortDesc: book.shortDesc,
        ISPN: book.ISPN,
        description: book.description,
        pageCount: book.pageCount,
        images: book.images,
        price: book.price,
        quantity: book.quantity,
      },
    });
  }

  // Remove a new book
  async removeBook(id: string) {
    const book = await this.prisma.books.delete({
      where: { id: id },
    });
    return book;
  }
  // Update a book
  async updateBook(id: string, book: UpdateBookDTO) {
    const updateBook = await this.prisma.books.update({
      data: {
        title: book.title,
        author: book.author,
        aboutAuthor: book.aboutAuthor,
        shortDesc: book.shortDesc,
        ISPN: book.ISPN,
        description: book.description,
        pageCount: book.pageCount,
        images: book.images,
        price: book.price,
        quantity: book.quantity,
      },
      where: { id: id },
    });

    return updateBook;
  }

  // Find Unique Book
  async getBookViaId(id: string) {
    console.log(id);
    const book = await this.prisma.books.findUnique({
      where: {
        id: id,
      },
    });
    return book;
  }

  // Purchase Book
  async createBookOrder(bookOrder: BuyBookDto) {
    const couponDetails = await this.prisma.coupon.findUnique({
      where: {
        code: bookOrder.couponCode,
      },
    });

    function getTotalPrice(totalPrice: any, discount: any) {
      if (totalPrice - discount <= 0) {
        return 0;
      }
      return bookOrder.totalPrice - couponDetails.discount;
    }
    const createOrderDto: any = {
      subtotalPrice: bookOrder.totalPrice,
      totalPrice: getTotalPrice(bookOrder.totalPrice, couponDetails.discount),
      couponCode: bookOrder.couponCode,
      user: {
        connect: {
          id: bookOrder.userId,
        },
      },
      shippingAddress: {
        connect: {
          id: bookOrder.shippingAddress,
        },
      },
    };

    const createdOrder = await this.prisma.order.create({
      data: createOrderDto,
      include: {
        user: true,
      },
    });

    const bookOrdersPromises = bookOrder.books.map(async (bookItem: any) => {
      const book = await this.prisma.books.findUnique({
        where: {
          id: bookItem.bookId,
        },
      });

      if (!book) {
        throw new Error(`Book with ID ${bookItem.bookId} not found`);
      }

      // Check if the requested quantity is available
      if (book.quantity < bookItem.quantity) {
        throw new Error(`Insufficient quantity available for book: ${book.title}`);
      }

      await this.prisma.books.update({
        where: {
          id: bookItem.bookId,
        },
        data: {
          quantity: book.quantity - bookItem.quantity,
        },
      });

      return {
        bookId: bookItem.bookId,
        quantity: bookItem.quantity,
        subtotal: await this.calculateSubtotal(bookItem.bookId, bookItem.quantity),
        orderId: createdOrder.id,
      };
    });

    const bookOrders: any = await Promise.all(bookOrdersPromises);
    // Wait for all promises to resolve
    const createdBookOrders = await this.prisma.bookOrder.createMany({ data: bookOrders });
    return { order: createdOrder, bookOrders: createdBookOrders };
  }

  // Find all book orders
  async getAllOrderData() {
    return await this.prisma.order.findMany({
      include: {
        user: true,
      },
    });
  }

  private async calculateSubtotal(bookId: string, quantity: number) {
    // Find the book in the array of books based on the bookId

    const book = await this.prisma.books.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!book) {
      // Handle the case where the book is not found (e.g., return an error or default value)
      throw new Error(`Book with ID ${bookId} not found`);
    }

    // Calculate the subtotal based on the book's price and quantity
    const subtotal = book.price * quantity;

    return subtotal;
  }
}
