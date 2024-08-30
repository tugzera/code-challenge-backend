import { Module } from '@nestjs/common';
import { CreateUserProviderFactory } from './infra/ioc/providers/create-user.provider';
import { DeleteUserProviderFactory } from './infra/ioc/providers/delete-user.provider';
import { GetUserListProviderFactory } from './infra/ioc/providers/get-user-list.provider';
import { UpdateUserProviderFactory } from './infra/ioc/providers/update-user.provider';
import { UserRepositoryProviderFactory } from './infra/ioc/providers/user-repository.provider';
import { UserController } from './presentation/controller/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserRepositoryProviderFactory.generate(),
    CreateUserProviderFactory.generate(),
    GetUserListProviderFactory.generate(),
    UpdateUserProviderFactory.generate(),
    DeleteUserProviderFactory.generate(),
  ],
})
export class UserModule {}
