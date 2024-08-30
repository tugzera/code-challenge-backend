import { Provider } from '@nestjs/common';
import { GetUserList } from 'src/users/application/use-cases/get-user-list';
import { UserRepository } from '../../../../users/domain/repositories';
import { UserProvider } from '../user-provider';

export class GetUserListProviderFactory {
  static generate(): Provider {
    return {
      provide: UserProvider.GET_USER_LIST,
      useFactory: (userRepository: UserRepository): GetUserList.Contract => {
        return new GetUserList(userRepository);
      },
      inject: [UserProvider.USER_REPOSITORY],
    };
  }
}
