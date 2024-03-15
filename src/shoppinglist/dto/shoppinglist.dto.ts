export class ShoppinglistDto {
    readonly id: string;
    readonly product: string;
    readonly amount: number;
    readonly status?: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}