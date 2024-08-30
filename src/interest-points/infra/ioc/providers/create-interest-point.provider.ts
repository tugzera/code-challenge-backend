import { Provider } from '@nestjs/common';
import { CreateInterestPoint } from 'src/interest-points/application/create-interest-point';
import { InterestPointRepository } from 'src/interest-points/domain/repositories';
import { InterestPointProvider } from '../interest-point.provider';

export class CreateInterestPointProviderFactory {
  static generate(): Provider {
    return {
      provide: InterestPointProvider.CREATE_INTEREST_POINT,
      useFactory: (
        interestPointRepository: InterestPointRepository,
      ): CreateInterestPoint.Contract => {
        return new CreateInterestPoint(interestPointRepository);
      },
      inject: [InterestPointProvider.INTEREST_POINT_REPOSITORY],
    };
  }
}
