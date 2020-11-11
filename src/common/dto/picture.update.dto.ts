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
  

export class PictureUpdateDto {
    @IsOptional()
    @IsString()
    readonly name?: string

    @IsOptional()
    @IsString()
    readonly author?: string

    @IsOptional()
    @IsString()
    readonly price?: string 
}