import { IsString } from "class-validator";

export class CreateFloatDto {
    @IsString()
    readonly currency: string

    @IsString()
    readonly initialmount: number

    @IsString()
    readonly serviceAgent: string


}
