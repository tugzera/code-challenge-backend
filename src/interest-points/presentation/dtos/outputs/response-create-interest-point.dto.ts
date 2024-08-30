import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseCreateInterestPointDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Restaurante' })
  @Expose()
  name: string;

  @ApiProperty({ example: -17.7948365 })
  @Expose()
  latitude: number;

  @ApiProperty({ example: -50.9196237 })
  @Expose()
  longitude: number;

  @ApiPropertyOptional({
    example: 'Este é um lugar adorável para comer com a família',
  })
  @Expose()
  description: string | null;

  @ApiProperty({ example: '2024-08-30T15:34:33.359Z' })
  @Expose()
  createdAt: string;

  @ApiProperty({ example: '2024-08-30T15:34:33.359Z' })
  @Expose()
  updatedAt: string;
}
