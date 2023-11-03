import { Controller, Get, UseGuards, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserAddress, CreateUserDto, UpdateUserAddress, UpdateUserDto } from 'src/dto/users.dto';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  // Get all users
  @Get('all')
  getUsers() {
    return this.userService.getAllUser();
  }

  // Create a new user
  @Post('create')
  createUser(@Body() createUser: CreateUserDto) {
    return this.userService.createUser(createUser);
  }

  // Delete a new user
  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
  // Get a user information
  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }

  // Update a new user
  @Put(':userId')
  updateUser(@Param('userId') userId: string, @Body() createUser: UpdateUserDto) {
    return this.userService.updateUser(userId, createUser);
  }

  //Get All address of the user
  @Get(':userId/address')
  getAllUserAddress(@Param('userId') userId: string) {
    return this.userService.getAllUserAddress(userId);
  }

  //Update user address
  @Put('address/:addressId')
  deleteUserAddress(@Param('addressId') addressId: string) {
    return this.userService.deleteUserAddress(addressId);
  }

  @Delete('address/:addressId')
  updateUserAddress(@Param('addressId') addressId: string, @Body() data: UpdateUserAddress) {
    return this.userService.updateUserAddress(addressId, data);
  }

  //Create Address for user
  @Post(':userId/address/create')
  createAddress(@Param('userId') userId: string, @Body() createAddress: CreateUserAddress) {
    return this.userService.createUserAddress(userId, createAddress);
  }
}
