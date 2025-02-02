import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login_user_dto';
import { UserWithOutPassword } from './schema/user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return await this.userService.login(loginUserDto);
  }

  @Get(':name')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found successfully.',
    type: UserWithOutPassword,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  async findUser(@Param('name') name: string): Promise<UserWithOutPassword> {
    return await this.userService.findUser(name);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users found successfully.',
    type: [UserWithOutPassword],
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No users found.' })
  async findAll(): Promise<UserWithOutPassword[]> {
    return await this.userService.findAll();
  }

  @Put(':name')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully.',
    type: UserWithOutPassword,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  async update(
    @Param('name') name: string,
    @Body() updateUserDto: CreateUserDto,
  ): Promise<UserWithOutPassword> {
    return await this.userService.update(name, updateUserDto);
  }

  @Delete(':name')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully.',
    type: UserWithOutPassword,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  async delete(@Param('name') name: string): Promise<UserWithOutPassword> {
    return await this.userService.delete(name);
  }
}
