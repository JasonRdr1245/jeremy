import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
@Schema()
export class User {
  _id?: mongoose.Types.ObjectId;
  @ApiProperty({
    type: String,
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @Prop({ required: true, type: String })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The address of the user',
    example: '123 Main St',
  })
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, type: [String] })
  address: [string];

  @ApiProperty({
    type: Number,
    description: 'The phone number of the user',
    example: 1234567890,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Prop({ required: false, type: Number, default: null })
  phone?: number;

  @ApiProperty({
    type: String,
    description: 'The password of the user',
    example: 'password123',
  })
  @Prop({ required: true, type: String })
  @IsString()
  @IsNotEmpty()
  passsword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export class UserWithOutPassword {
  _id?: mongoose.Types.ObjectId;
  @ApiProperty({
    type: String,
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @Prop({ required: true, type: String })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    description: 'The address of the user',
    example: '123 Main St',
  })
  @IsNotEmpty()
  @IsString()
  @Prop({ required: true, type: [String] })
  address: [string];

  @ApiProperty({
    type: Number,
    description: 'The phone number of the user',
    example: 1234567890,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Prop({ required: false, type: Number, default: null })
  phone?: number;

  static fromUser(user: User): UserWithOutPassword {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passsword, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
