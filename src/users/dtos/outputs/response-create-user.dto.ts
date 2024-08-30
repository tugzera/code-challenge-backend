import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ResponseCreateUserDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id: string;

  @ApiProperty({ example: 'Henrique' })
  @Expose()
  firstName: string;

  @ApiProperty({ example: 'Damasceno' })
  @Expose()
  lastName: string;

  @ApiProperty({ example: 'henrique@teste.com' })
  @Expose()
  email: string;
}
