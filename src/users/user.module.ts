import { Module } from '@nestjs/common';
import { CreateUserProviderFactory } from './infra/ioc/providers/create-user.provider';
import { UserRepositoryProviderFactory } from './infra/ioc/providers/user-repository.provider';
import { UserController } from './presentation/controller/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserRepositoryProviderFactory.generate(),
    CreateUserProviderFactory.generate(),
  ],
})
export class UserModule {}
