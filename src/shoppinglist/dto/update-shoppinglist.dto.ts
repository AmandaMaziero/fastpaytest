import { PartialType } from '@nestjs/swagger';
import { CreateShoppinglistDto } from './create-shoppinglist.dto';

export class UpdateShoppinglistDto extends PartialType(CreateShoppinglistDto) {}
