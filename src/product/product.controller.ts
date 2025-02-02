import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schema/product.schema';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product created successfully.',
    type: Product,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products retrieved successfully.',
    type: [Product],
  })
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product retrieved successfully.',
    type: Product,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found.',
  })
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product updated successfully.',
    type: Product,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product deleted successfully.',
    type: Product,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product not found.',
  })
  async delete(@Param('id') id: string): Promise<Product> {
    return await this.productService.delete(id);
  }
}
