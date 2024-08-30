import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsNotEmpty } from 'class-validator';

export class GetNearbyInterestPointsDto {
  @ApiProperty({ example: -17.7948365 })
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ example: -50.9196237 })
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @ApiProperty({ example: 1, description: 'In kms' })
  @IsNotEmpty()
  @IsNotEmpty()
  distance: number;
}
