import { Module } from '@nestjs/common';
import { CreateUserProviderFactory } from './infra/ioc/providers/create-user.provider';
import { GetUserListProviderFactory } from './infra/ioc/providers/get-user-list.provider';
import { UserRepositoryProviderFactory } from './infra/ioc/providers/user-repository.provider';
import { UserController } from './presentation/controller/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserRepositoryProviderFactory.generate(),
    CreateUserProviderFactory.generate(),
    GetUserListProviderFactory.generate(),
  ],
})
export class UserModule {}
