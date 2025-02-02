import { OmitType } from '@nestjs/swagger';
import { User } from '../schema/user.schema';

export class CreateUserDto extends OmitType(User, ['_id']) {}
