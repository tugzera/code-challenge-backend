import { Provider } from '@nestjs/common';
import { HashGenerator } from 'src/shared/contracts/hash-generator';
import { SharedProvider } from 'src/shared/shared-provider';
import { UserRepository } from '../domain/repositories';
import { CreateUser } from '../services/create-user';
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
