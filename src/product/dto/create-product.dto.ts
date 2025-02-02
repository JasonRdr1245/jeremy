import { OmitType } from '@nestjs/swagger';
import { Product } from '../schema/product.schema';

export class CreateProductDto extends OmitType(Product, ['_id']) {}
