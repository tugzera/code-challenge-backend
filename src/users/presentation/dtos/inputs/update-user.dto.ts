import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PasswordDecorator } from '../../../../shared/presentation/decorators/password.decorator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Henrique' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  firstName?: string;

  @ApiProperty({ example: 'Damasceno' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  lastName?: string;

  @ApiProperty({ example: 'email@teste.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @PasswordDecorator(false)
  password?: string;
}
