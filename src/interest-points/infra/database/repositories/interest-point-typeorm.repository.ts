import { InterestPoint } from 'src/interest-points/domain/entities';
import { InterestPointTypeormModel } from 'src/shared/infra/database/models/interest-point.model';
import { BaseTypeormRepository } from '../../../../shared/infra/database/repositories/base-typeorm.repository';
import { InterestPointRepository } from '../../../domain/repositories';

export class InterestPointTypeormRepository
  extends BaseTypeormRepository<InterestPointTypeormModel, InterestPoint>
  implements InterestPointRepository {}
