import { InterestPointCategory } from 'src/interest-points/domain/entities';
import { BaseMapper } from 'src/shared/infra/database/mapper/base.mapper';
import { InterestPointCategoryTypeormModel } from 'src/shared/infra/database/models/interest-point-category.model';

export class InterestPointCategoryTypeormMapper
  implements
    BaseMapper<InterestPointCategory, InterestPointCategoryTypeormModel>
{
  entityToModel(
    domain: InterestPointCategory,
  ): InterestPointCategoryTypeormModel {
    return new InterestPointCategoryTypeormModel({
      id: domain.id,
      name: domain.name,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    });
  }

  modelToEntity(
    model: InterestPointCategoryTypeormModel,
  ): InterestPointCategory {
    return new InterestPointCategory({
      id: model.id,
      alternativeId: model.alternativeId,
      name: model.name,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
