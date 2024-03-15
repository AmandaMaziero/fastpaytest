import { Module } from '@nestjs/common';
import { ShoppinglistService } from './shoppinglist.service';
import { ShoppinglistController } from './shoppinglist.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ShoppinglistController],
  providers: [ShoppinglistService, PrismaService],
})
export class ShoppinglistModule {}
