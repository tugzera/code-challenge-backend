import { InterestPoint } from 'src/interest-points/domain/entities';
import { BaseMapper } from 'src/shared/infra/database/mapper/base.mapper';
import { InterestPointTypeormModel } from 'src/shared/infra/database/models/interest-point.model';

export class InterestPointTypeormMapper
  implements BaseMapper<InterestPoint, InterestPointTypeormModel>
{
  entityToModel(domain: InterestPoint): InterestPointTypeormModel {
    return new InterestPointTypeormModel({
      id: domain.id,
      name: domain.name,
      description: domain.description,
      position: `(${domain.latitude}, ${domain.longitude})`,
      interestPointCategoryId: domain.interestPointCategoryId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    });
  }

  modelToEntity(model: InterestPointTypeormModel): InterestPoint {
    const position: { x: number; y: number } = model.position as any;
    return new InterestPoint({
      id: model.id,
      alternativeId: model.alternativeId,
      name: model.name,
      description: model.description,
      latitude: Number(position.x),
      longitude: Number(position.y),
      interestPointCategoryId: model.interestPointCategoryId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
  }
}
