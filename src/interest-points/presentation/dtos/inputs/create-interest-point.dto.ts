import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateInterestPointDto {
  @ApiProperty({ example: 'Nelore' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsUUID()
  interestPointCategoryId: string;

  @ApiProperty({ example: 'Este é um lugar adorável para comer com a família' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiProperty({ example: -17.7948365 })
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ example: -50.9196237 })
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;
}
