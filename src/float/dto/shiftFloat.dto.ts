import { IsNumber, IsString } from "class-validator";

export class ShifFloatDto {


    @IsString()
    readonly agentEndingShift: string

    @IsString()
    readonly agentStartingShift: string



}
