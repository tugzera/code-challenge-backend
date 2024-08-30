import { Module } from '@nestjs/common';
import { CreateInterestPointCategoryProviderFactory } from './infra/ioc/providers/create-interest-point-category.provider';
import { InterestPointCategoryRepositoryProviderFactory } from './infra/ioc/providers/interest-point-category-repository.provider';
import { InterestPointCategoryController } from './presentation/controllers/interest-point-category.controller';

@Module({
  imports: [],
  controllers: [InterestPointCategoryController],
  providers: [
    InterestPointCategoryRepositoryProviderFactory.generate(),
    CreateInterestPointCategoryProviderFactory.generate(),
  ],
})
export class InterestPointModule {}
