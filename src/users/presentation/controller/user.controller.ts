import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { PaginationResponseProps } from 'src/shared/domain/types';
import { ApiPaginatedResponse } from 'src/shared/presentation/decorators/paginated.decorator';
import { PaginationPropsDto } from 'src/shared/presentation/dtos/pagination-props.dto';
import { GetUserList } from 'src/users/application/use-cases/get-user-list';
import { User } from 'src/users/domain/entities/user';
import { CreateUser } from '../../../users/application/use-cases/create-user';
import { UserProvider } from '../../../users/infra/ioc/user-provider';
import { CreateUserDto, GetUserListDto, SortDirection } from '../dtos/inputs';
import { ResponseCreateUserDto } from '../dtos/outputs';
import { ResponseGetUserListDto } from '../dtos/outputs/response-get-user-list.dto';

@ApiExtraModels(ResponseGetUserListDto, PaginationPropsDto)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserProvider.CREATE_USER)
    private createUser: CreateUser.Contract,
    @Inject(UserProvider.GET_USER_LIST)
    private getUserList: GetUserList.Contract,
  ) {}

  @ApiCreatedResponse({ type: ResponseCreateUserDto })
  @Post()
  async handleCreateUser(
    @Body() input: CreateUserDto,
  ): Promise<ResponseCreateUserDto> {
    const response = await this.createUser.execute(input);
    return response;
  }

  @ApiPaginatedResponse({ model: ResponseGetUserListDto })
  @Get()
  async handleGetUserList(
    @Query() input: GetUserListDto,
  ): Promise<PaginationResponseProps<ResponseGetUserListDto>> {
    const response = await this.getUserList.execute({
      page: input.page || 1,
      pageSize: input.pageSize || 10,
      sortBy: input.sortBy as keyof User,
      searchString: input.searchString,
      sortDirection: input.sortDirection as SortDirection,
    });
    return response;
  }
}
