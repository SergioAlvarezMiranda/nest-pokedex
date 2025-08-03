import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    //Condiciones
    //isInt, isPositive, valor min 1
    @IsInt()
    @IsPositive()
    @Min(1)
    no:number;

    //isString, MinLenth 1
    @IsString()
    @MinLength(1)
    name:string;
}
