import { OmitType } from '@nestjs/swagger';
import { Order } from '../schema/order.schema';

export class CreateOrderDto extends OmitType(Order, ['_id']) {}
