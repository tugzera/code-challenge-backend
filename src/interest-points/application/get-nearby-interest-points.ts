import { InterestPointRepository } from '../domain/repositories';

export class GetNearbyInterestPoints
  implements GetNearbyInterestPoints.Contract
{
  constructor(private interestPointRepository: InterestPointRepository) {}
  private distanceInKms = 1000;

  async execute(
    input: GetNearbyInterestPoints.Input,
  ): GetNearbyInterestPoints.Output {
    const interestPoints =
      await this.interestPointRepository.getNearbyInterestPoints({
        latitude: input.latitude,
        longitude: input.longitude,
        distance: input.distance * this.distanceInKms,
      });
    return interestPoints.map((interestPoint) => ({
      id: interestPoint.id,
      name: interestPoint.name,
      description: interestPoint.description,
      latitude: interestPoint.latitude,
      longitude: interestPoint.longitude,
      createdAt: interestPoint.createdAt.toISOString(),
      updatedAt: interestPoint.updatedAt?.toISOString(),
    }));
  }
}

export namespace GetNearbyInterestPoints {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    latitude: number;
    longitude: number;
    distance: number;
  };
  export type Output = Promise<Response[]>;
  type Response = {
    id: string;
    name: string;
    description: string | null;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string | null;
  };
}
