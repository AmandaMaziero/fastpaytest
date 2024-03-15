import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ShoppinglistService } from './shoppinglist.service';
import { CreateShoppinglistDto } from './dto/create-shoppinglist.dto';
import { UpdateShoppinglistDto } from './dto/update-shoppinglist.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Shopping List')
@Controller('shoppinglist')
export class ShoppinglistController {
  constructor(private readonly shoppinglistService: ShoppinglistService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBody({ schema: { example: { product: '', amount: 1 } } })
  create(@Body() createShoppinglistDto: CreateShoppinglistDto) {
    return this.shoppinglistService.create(createShoppinglistDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.shoppinglistService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string) {
    return this.shoppinglistService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ schema: { example: { product: '', amount: 1, status: 1 } } })
  update(@Param('id') id: string, @Body() updateShoppinglistDto: UpdateShoppinglistDto) {
    return this.shoppinglistService.update(id, updateShoppinglistDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.shoppinglistService.remove(id);
  }
}
