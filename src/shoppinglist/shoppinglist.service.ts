import { Injectable } from '@nestjs/common';
import { CreateShoppinglistDto } from './dto/create-shoppinglist.dto';
import { UpdateShoppinglistDto } from './dto/update-shoppinglist.dto';
import { ShoppinglistDto } from './dto/shoppinglist.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ShoppinglistService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createShoppinglistDto: CreateShoppinglistDto) {
    const shoppinglist = await this.prismaService.shoppingList.create({
      data: {
        product: createShoppinglistDto.product,
        amount: createShoppinglistDto.amount
      },
    });

    return this.mapShoppingListToDto(shoppinglist);
  }

  async findAll() {
    return this.prismaService.shoppingList.findMany().then(shoppinglists => shoppinglists.map(this.mapShoppingListToDto));
  }

  async findOne(id: string) {
    return this.prismaService.shoppingList.findUnique({ where: { id } }).then(this.mapShoppingListToDto).catch(() => null);
  }

  async update(id: string, updateShoppinglistDto: UpdateShoppinglistDto) {
    const shoppinglist = await this.prismaService.shoppingList.update({
      where: { id },
      data: {
        ...updateShoppinglistDto,
      },
    });

    if (!shoppinglist) {
      return null;
    }

    return this.mapShoppingListToDto(shoppinglist);
  }

  async remove(id: string) {
    return this.prismaService.shoppingList.delete({ where: { id } });
  }

  private mapShoppingListToDto(product: any): ShoppinglistDto {
    return {
      id: product.id,
      product: product.product,
      amount: product.amount,
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
