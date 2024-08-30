import { Provider } from '@nestjs/common';
import { HashGenerator } from '../../../../shared/domain/contracts/hash-generator';
import { SharedProvider } from '../../../../shared/infra/ioc/shared-provider';
import { CreateUser } from '../../../../users/application/use-cases/create-user';
import { UserRepository } from '../../../../users/domain/repositories';
import { UserProvider } from '../user-provider';

export class CreateUserProviderFactory {
  static generate(): Provider {
    return {
      provide: UserProvider.CREATE_USER,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
      ): CreateUser.Contract => {
        return new CreateUser(userRepository, hashGenerator);
      },
      inject: [UserProvider.USER_REPOSITORY, SharedProvider.HASH_GENERATOR],
    };
  }
}
