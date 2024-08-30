import { Provider } from '@nestjs/common';
import { InterestPointRepository } from 'src/interest-points/domain/repositories';
import { InterestPointTypeormModel } from 'src/shared/infra/database/models/interest-point.model';
import { DataSource } from 'typeorm';
import { SharedProvider } from '../../../../shared/infra/ioc/shared-provider';
import { InterestPointTypeormRepository } from '../../database/repositories';
import { InterestPointTypeormMapper } from '../../database/repositories/mapper/interest-point-typeorm.repository';
import { InterestPointProvider } from '../interest-point.provider';

export class InterestPointRepositoryProviderFactory {
  static generate(): Provider {
    return {
      provide: InterestPointProvider.INTEREST_POINT_REPOSITORY,
      useFactory: (databaseConnection: DataSource): InterestPointRepository => {
        return new InterestPointTypeormRepository(
          databaseConnection,
          InterestPointTypeormModel,
          new InterestPointTypeormMapper(),
        );
      },
      inject: [SharedProvider.DATABASE_CONNECTION],
    };
  }
}
