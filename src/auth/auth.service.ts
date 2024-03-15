import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) { }
    async login(email: string, password: string) {
        const user = await this.prismaService.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error('Invalid password');
        }

        return this.generateToken({ userId: user.id, email: user.email });
    }

    async generateToken(user: any) {
        return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1d' })
    }
}
