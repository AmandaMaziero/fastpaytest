import { ApiProperty } from "@nestjs/swagger";

export class CreateShoppinglistDto {
    @ApiProperty()
    readonly product: string;

    @ApiProperty()
    readonly amount: number;

    @ApiProperty()
    readonly status?: number;
}
