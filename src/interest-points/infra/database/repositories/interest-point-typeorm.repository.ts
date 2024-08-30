import { InterestPoint } from 'src/interest-points/domain/entities';
import { InterestPointTypeormModel } from 'src/shared/infra/database/models/interest-point.model';
import { BaseTypeormRepository } from '../../../../shared/infra/database/repositories/base-typeorm.repository';
import { InterestPointRepository } from '../../../domain/repositories';

export class InterestPointTypeormRepository
  extends BaseTypeormRepository<InterestPointTypeormModel, InterestPoint>
  implements InterestPointRepository
{
  async getNearbyInterestPoints(input: {
    latitude: number;
    longitude: number;
    distance: number;
  }): Promise<InterestPoint[]> {
    const { latitude, longitude, distance } = input;
    const query = this.repository.createQueryBuilder('interestPoints');
    query.where(
      `ST_DWithin(
        ST_SetSRID(ST_MakePoint(position[0], position[1]), 4326)::geography, 
        ST_MakePoint(:latitude, :longitude)::geography, 
        :distance
    )`,
      { latitude, longitude, distance },
    );
    const [items] = await query.getManyAndCount();
    return items.map((item) => this.mapper.modelToEntity(item));
  }
}
