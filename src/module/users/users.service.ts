import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserAddress, CreateUserDto, UpdateUserAddress, UpdateUserDto } from 'src/dto/users.dto';
import { NOT_FOUND, OK } from 'http-status';
import { AuthGuard } from 'src/guards/jwt-auth.guard';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create users
  createUser(data: CreateUserDto) {
    const user = this.prisma.user.create({
      data: data,
    });
    return user;
  }

  // Get All user
  async getAllUser() {
    const users = await this.prisma.user.findMany({});
    return {
      message: 'Users Lists',
      statusCode: OK,
      data: { users },
    };
  }

  // Get All user
  async getUserById(userId: string) {
    const user = await this.userFind(userId);
    if (user) {
      return {
        message: 'User Found',
        statusCode: OK,
        data: { user },
      };
    } else {
      return {
        message: 'User Not Found',
        statusCode: NOT_FOUND,
      };
    }
  }

  // Update users
  async updateUser(id: string, data: UpdateUserDto) {
    // check if user have or not
    const user = await this.userFind(id);
    if (user) {
      const updateUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: data,
      });
      return {
        message: 'User has been updated',
        statusCode: OK,
      };
    } else {
      return {
        message: 'User Not Found',
        statusCode: NOT_FOUND,
      };
    }
  }

  // Update users
  async deleteUser(id: string) {
    // check if user have or not
    const user = await this.userFind(id);

    if (user) {
      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return {
        message: 'User has been deleted successfully',
        statusCode: OK,
        data: { user },
      };
    } else {
      return {
        message: 'User Not Found',
        statusCode: NOT_FOUND,
      };
    }
  }

  //Create new address
  createUserAddress(id: string, data: CreateUserAddress) {
    const address = this.prisma.userAddress.create({
      data: { userId: id, ...data },
    });
    return address;
  }
  // Update users
  updateUserAddress(id: string, data: UpdateUserAddress) {
    const user = this.prisma.userAddress.update({
      where: {
        id: id,
      },
      data: data,
    });
    return user;
  }

  // Get All Address if user
  getAllUserAddress(id: string) {
    const address = this.prisma.userAddress.findMany({
      where: {
        userId: id,
      },
    });
    return address;
  }

  // Delete a user Address
  deleteUserAddress(id: string) {
    const address = this.prisma.userAddress.delete({
      where: {
        id: id,
      },
    });
    return address;
  }

  // get the user details
  async userFind(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
