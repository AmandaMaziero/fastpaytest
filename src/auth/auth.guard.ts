import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;

        if (!token) {
            console.log('No token');
            return false;
        }

        try {
            const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);

            return true;
        } catch (err) {
            return false;
        }
    }
}