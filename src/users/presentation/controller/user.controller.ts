import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationResponseProps } from 'src/shared/domain/types';
import { ApiPaginatedResponse } from 'src/shared/presentation/decorators/paginated.decorator';
import { PaginationPropsDto } from 'src/shared/presentation/dtos/pagination-props.dto';
import { DeleteUser } from 'src/users/application/use-cases/delete-user';
import { GetUserList } from 'src/users/application/use-cases/get-user-list';
import { UpdateUser } from 'src/users/application/use-cases/update-user';
import { User } from 'src/users/domain/entities/user';
import { CreateUser } from '../../../users/application/use-cases/create-user';
import { UserProvider } from '../../../users/infra/ioc/user-provider';
import { CreateUserDto, GetUserListDto, SortDirection } from '../dtos/inputs';
import { UpdateUserDto } from '../dtos/inputs/update-user.dto';
import {
  ResponseCreateUserDto,
  ResponseGetUserListDto,
  ResponseUpdateUserDto,
} from '../dtos/outputs';

@ApiExtraModels(ResponseGetUserListDto, PaginationPropsDto)
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserProvider.CREATE_USER)
    private createUser: CreateUser.Contract,
    @Inject(UserProvider.GET_USER_LIST)
    private getUserList: GetUserList.Contract,
    @Inject(UserProvider.UPDATE_USER)
    private updateUser: UpdateUser.Contract,
    @Inject(UserProvider.DELETE_USER)
    private deleteUser: DeleteUser.Contract,
  ) {}

  @ApiCreatedResponse({ type: ResponseCreateUserDto })
  @Post()
  async handleCreateUser(
    @Body() input: CreateUserDto,
  ): Promise<ResponseCreateUserDto> {
    return this.createUser.execute(input);
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

  @ApiOkResponse({ type: ResponseUpdateUserDto })
  @Patch(':userId')
  async handleUpdateUser(
    @Param('userId', ParseUUIDPipe)
    userId: string,
    @Body() input: UpdateUserDto,
  ): Promise<ResponseUpdateUserDto> {
    return this.updateUser.execute({ ...input, userId });
  }

  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':userId')
  async handleDeleteUser(
    @Param('userId', ParseUUIDPipe)
    userId: string,
  ): Promise<void> {
    await this.deleteUser.execute({ userId });
  }
}
