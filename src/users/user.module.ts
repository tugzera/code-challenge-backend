import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { CreateUserProviderFactory } from './providers/create-user.provider';
import { UserRepositoryProviderFactory } from './providers/user-repository.provider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserRepositoryProviderFactory.generate(),
    CreateUserProviderFactory.generate(),
  ],
})
export class UserModule {}
