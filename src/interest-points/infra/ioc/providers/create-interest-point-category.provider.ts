import { Provider } from '@nestjs/common';
import { CreateInterestPointCategory } from 'src/interest-points/application/create-interest-point-category';
import { InterestPointCategoryRepository } from 'src/interest-points/domain/repositories';
import { InterestPointProvider } from '../interest-point.provider';

export class CreateInterestPointCategoryProviderFactory {
  static generate(): Provider {
    return {
      provide: InterestPointProvider.CREATE_INTEREST_POINT_CATEGORY,
      useFactory: (
        interestPointCategoryRepository: InterestPointCategoryRepository,
      ): CreateInterestPointCategory.Contract => {
        return new CreateInterestPointCategory(interestPointCategoryRepository);
      },
      inject: [InterestPointProvider.INTEREST_POINT_CATEGORY_REPOSITORY],
    };
  }
}
