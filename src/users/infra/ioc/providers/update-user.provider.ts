import { Provider } from '@nestjs/common';
import { UpdateUser } from 'src/users/application/use-cases/update-user';
import { HashGenerator } from '../../../../shared/domain/contracts/hash-generator';
import { SharedProvider } from '../../../../shared/infra/ioc/shared-provider';
import { UserRepository } from '../../../../users/domain/repositories';
import { UserProvider } from '../user-provider';

export class UpdateUserProviderFactory {
  static generate(): Provider {
    return {
      provide: UserProvider.UPDATE_USER,
      useFactory: (
        userRepository: UserRepository,
        hashGenerator: HashGenerator,
      ): UpdateUser.Contract => {
        return new UpdateUser(userRepository, hashGenerator);
      },
      inject: [UserProvider.USER_REPOSITORY, SharedProvider.HASH_GENERATOR],
    };
  }
}
