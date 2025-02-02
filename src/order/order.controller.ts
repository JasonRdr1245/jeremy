import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Order } from './schema/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order created successfully.',
    type: Order,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderService.create(createOrderDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Orders retrieved successfully.',
    type: [Order],
  })
  async findAll(): Promise<Order[]> {
    return await this.orderService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Order retrieved successfully.',
    type: Order,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Order not found.',
  })
  async findOne(@Param('id') id: string): Promise<Order> {
    return await this.orderService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Order deleted successfully.',
    type: Order,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Order not found.',
  })
  async delete(@Param('id') id: string): Promise<Order> {
    return await this.orderService.delete(id);
  }
}
