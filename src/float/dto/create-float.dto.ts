import { IsNumber, IsString } from "class-validator";

export class CreateFloatDto {
    @IsString()
    readonly currency: string

    @IsNumber()
    readonly initialmount: number

    @IsString()
    readonly serviceAgent: string


}
