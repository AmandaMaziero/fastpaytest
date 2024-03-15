export class UserDto {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly birthDate: Date;
    readonly document: string;
    readonly status: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}