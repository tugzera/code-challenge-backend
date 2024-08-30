import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserTypeormModel } from '../../../../shared/infra/database/models/user.model';
import { SharedProvider } from '../../../../shared/infra/ioc/shared-provider';
import { UserRepository } from '../../../../users/domain/repositories';
import { UserTypeormMapper } from '../../database/repositories/mapper/user-typeorm.mapper';
import { UserTypeormRepository } from '../../database/repositories/user-typeorm.repository';
import { UserProvider } from '../user-provider';

export class UserRepositoryProviderFactory {
  static generate(): Provider {
    return {
      provide: UserProvider.USER_REPOSITORY,
      useFactory: (databaseConnection: DataSource): UserRepository => {
        return new UserTypeormRepository(
          databaseConnection,
          UserTypeormModel,
          new UserTypeormMapper(),
        );
      },
      inject: [SharedProvider.DATABASE_CONNECTION],
    };
  }
}
