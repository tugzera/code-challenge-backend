import { Provider } from '@nestjs/common';
import { InterestPointCategoryRepository } from 'src/interest-points/domain/repositories';
import { InterestPointCategoryTypeormModel } from 'src/shared/infra/database/models/interest-point-category.model';
import { DataSource } from 'typeorm';
import { SharedProvider } from '../../../../shared/infra/ioc/shared-provider';
import { InterestPointCategoryTypeormRepository } from '../../database/repositories';
import { InterestPointCategoryTypeormMapper } from '../../database/repositories/mapper/interest-point-category-typeorm.mapper';
import { InterestPointProvider } from '../interest-point.provider';

export class InterestPointCategoryRepositoryProviderFactory {
  static generate(): Provider {
    return {
      provide: InterestPointProvider.INTEREST_POINT_CATEGORY_REPOSITORY,
      useFactory: (
        databaseConnection: DataSource,
      ): InterestPointCategoryRepository => {
        return new InterestPointCategoryTypeormRepository(
          databaseConnection,
          InterestPointCategoryTypeormModel,
          new InterestPointCategoryTypeormMapper(),
        );
      },
      inject: [SharedProvider.DATABASE_CONNECTION],
    };
  }
}
