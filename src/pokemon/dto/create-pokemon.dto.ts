import { IsInt, IsPositive, IsString, MinLength, Min } from "class-validator";

export class CreatePokemonDto {
    @IsInt()
    @IsPositive()
    @Min(1)
    nro: number

    @IsString()
    @MinLength(1)
    name: string
}
