import { Provider } from '@nestjs/common';
import { DeleteUser } from 'src/users/application/use-cases/delete-user';
import { UserRepository } from '../../../../users/domain/repositories';
import { UserProvider } from '../user-provider';

export class DeleteUserProviderFactory {
  static generate(): Provider {
    return {
      provide: UserProvider.DELETE_USER,
      useFactory: (userRepository: UserRepository): DeleteUser.Contract => {
        return new DeleteUser(userRepository);
      },
      inject: [UserProvider.USER_REPOSITORY],
    };
  }
}
