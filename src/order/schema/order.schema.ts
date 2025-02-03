import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

@Schema()
export class OrderDetail {
  _id?: mongoose.Types.ObjectId;
  //name

  @ApiProperty({
    type: String,
    description: 'The name of the item',
    example: 'Pizza Margherita',
  })
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, type: String })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'The quantity of the item',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true, type: Number })
  quantity: number;

  @ApiProperty({
    type: Number,
    description: 'The price of the item',
    example: 19.99,
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true, type: Number })
  price: number;

  @ApiProperty({
    type: String,
    description: 'Other details',
    example: 'Extra cheese',
    required: false,
  })
  @IsString()
  @Prop({ required: false, type: String })
  otherDetails?: string;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
@Schema()
export class Order {
  _id?: mongoose.Types.ObjectId;

  @ApiProperty({
    type: Number,
    description: 'The total of the order',
    example: 43.98,
  })
  @IsNotEmpty()
  @IsNumber()
  @Prop({ required: true, type: Number })
  total: number;

  @ApiProperty({
    type: [OrderDetail],
    description: 'The details of the order',
  })
  @IsArray()
  @Prop({ type: [OrderDetailSchema], required: true })
  details: OrderDetail[];
}
export const OrderSchema = SchemaFactory.createForClass(Order);
