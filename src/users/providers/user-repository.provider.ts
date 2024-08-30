import { Provider } from '@nestjs/common';
import { UserTypeormModel } from 'src/shared/database/models/user.model';
import { SharedProvider } from 'src/shared/shared-provider';
import { DataSource } from 'typeorm';
import { UserTypeormMapper } from '../database/repositories/mapper/user-typeorm.mapper';
import { UserTypeormRepository } from '../database/repositories/user-typeorm.repository';
import { UserRepository } from '../domain/repositories';
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
