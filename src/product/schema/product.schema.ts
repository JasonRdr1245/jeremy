import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

@Schema()
export class Product {
  _id?: mongoose.Types.ObjectId;

  @ApiProperty({
    type: String,
    description: 'The name of the product',
    example: 'Pizza Margherita',
  })
  @IsNotEmpty()
  @Prop({ required: true, type: String })
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'The price of the product',
    example: 9.99,
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true, type: Number })
  price: number;

  @ApiProperty({
    type: String,
    description: 'The description of the product',
    example: 'A classic pizza with tomatoes, mozzarella cheese, and basil.',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Prop({ required: false, type: String })
  description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
