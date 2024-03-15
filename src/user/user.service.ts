import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 12);

    const date = new Date(createUserDto.birthDate);

    const user = await this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hash,
        birthDate: date.toISOString(),
        document: createUserDto.document
      },
    });

    return this.mapUserToDto(user);
  }

  async findAll() {
    return this.prismaService.user.findMany().then(users => users.map(this.mapUserToDto));
  }

  async findOne(id: string) {
    return this.prismaService.user.findUnique({ where: { id } }).then(this.mapUserToDto).catch(() => null);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUserDto = updateUserDto.password ? { ...updateUserDto, password: await bcrypt.hash(updateUserDto.password, 12) } : updateUserDto;

    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        ...updatedUserDto,
      },
    });

    if (!user) {
      return null;
    }

    return this.mapUserToDto(user);
  }

  async remove(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }

  private mapUserToDto(user: any): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      document: user.document,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
