import {
    IsString,
    MaxLength,
    IsNumber,
    ValidateNested,
    IsNumberString,
    ArrayMaxSize,
    IsOptional,
    Min,
    Max,
    IS_ALPHA,
  } from 'class-validator'
  

export class PictureCreateDto {
    @IsString()
    readonly name: string

    @IsString()
    readonly author: string

    @IsString()
    readonly price: string 
}