import { BaseRepository } from 'src/shared/domain/repositories';
import { InterestPoint } from '../entities';

export interface InterestPointRepository extends BaseRepository<InterestPoint> {
  getNearbyInterestPoints(input: {
    latitude: number;
    longitude: number;
    distance: number;
  }): Promise<InterestPoint[]>;
}
