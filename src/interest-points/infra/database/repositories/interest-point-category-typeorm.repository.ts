import { InterestPointCategory } from 'src/interest-points/domain/entities';
import { InterestPointCategoryTypeormModel } from 'src/shared/infra/database/models/interest-point-category.model';
import { BaseTypeormRepository } from '../../../../shared/infra/database/repositories/base-typeorm.repository';
import { InterestPointCategoryRepository } from '../../../domain/repositories';

export class InterestPointCategoryTypeormRepository
  extends BaseTypeormRepository<
    InterestPointCategoryTypeormModel,
    InterestPointCategory
  >
  implements InterestPointCategoryRepository {}
