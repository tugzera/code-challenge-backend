import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationPropsDto } from 'src/shared/presentation/dtos/pagination-props.dto';
import { GetUserList } from 'src/users/application/use-cases/get-user-list';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class GetUserListDto extends PaginationPropsDto {
  @ApiPropertyOptional({ example: 'createdAt' })
  @IsOptional()
  @IsEnum(GetUserList.SortBy)
  sortBy?: string;
}
