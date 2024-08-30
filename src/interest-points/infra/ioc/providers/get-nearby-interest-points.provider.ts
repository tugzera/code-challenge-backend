import { Provider } from '@nestjs/common';
import { GetNearbyInterestPoints } from 'src/interest-points/application/get-nearby-interest-points';
import { InterestPointRepository } from 'src/interest-points/domain/repositories';
import { InterestPointProvider } from '../interest-point.provider';

export class GetNearbyInterestPointProviderFactory {
  static generate(): Provider {
    return {
      provide: InterestPointProvider.GET_NEARBY_INTEREST_POINTS,
      useFactory: (
        interestPointRepository: InterestPointRepository,
      ): GetNearbyInterestPoints.Contract => {
        return new GetNearbyInterestPoints(interestPointRepository);
      },
      inject: [InterestPointProvider.INTEREST_POINT_REPOSITORY],
    };
  }
}
