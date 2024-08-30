import { Module } from '@nestjs/common';
import { CreateInterestPointCategoryProviderFactory } from './infra/ioc/providers/create-interest-point-category.provider';
import { CreateInterestPointProviderFactory } from './infra/ioc/providers/create-interest-point.provider';
import { GetNearbyInterestPointProviderFactory } from './infra/ioc/providers/get-nearby-interest-points.provider';
import { InterestPointCategoryRepositoryProviderFactory } from './infra/ioc/providers/interest-point-category-repository.provider';
import { InterestPointRepositoryProviderFactory } from './infra/ioc/providers/interest-point-repository.provider';
import { InterestPointCategoryController } from './presentation/controllers/interest-point-category.controller';
import { InterestPointController } from './presentation/controllers/interest-point.controller';

@Module({
  imports: [],
  controllers: [InterestPointCategoryController, InterestPointController],
  providers: [
    InterestPointCategoryRepositoryProviderFactory.generate(),
    CreateInterestPointCategoryProviderFactory.generate(),
    InterestPointRepositoryProviderFactory.generate(),
    CreateInterestPointProviderFactory.generate(),
    GetNearbyInterestPointProviderFactory.generate(),
  ],
})
export class InterestPointModule {}
