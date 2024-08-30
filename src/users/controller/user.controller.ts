import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/inputs';
import { ResponseCreateUserDto } from '../dtos/outputs';
import { CreateUser } from '../services/create-user';
import { UserProvider } from '../user-provider';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject(UserProvider.CREATE_USER)
    private createUser: CreateUser.Contract,
  ) {}

  @ApiCreatedResponse({ type: ResponseCreateUserDto })
  @Post()
  async handleCreateUser(
    @Body() input: CreateUserDto,
  ): Promise<ResponseCreateUserDto> {
    const response = await this.createUser.execute(input);
    return response;
  }
}
