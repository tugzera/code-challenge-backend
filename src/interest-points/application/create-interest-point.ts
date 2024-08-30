import { InterestPoint } from '../domain/entities';
import { InterestPointCategoryRepository } from '../domain/repositories';

export class CreateInterestPoint implements CreateInterestPoint.Contract {
  constructor(
    private interestPointCategoryRepository: InterestPointCategoryRepository,
  ) {}

  async execute(input: CreateInterestPoint.Input): CreateInterestPoint.Output {
    const interestPointCategory = InterestPoint.create({
      name: input.name,
      description: input.description || null,
      interestPointCategoryId: input.interestPointCategoryId,
      latitude: input.latitude,
      longitude: input.longitude,
    });
    await this.interestPointCategoryRepository.save(interestPointCategory);
    return {
      id: interestPointCategory.id,
      name: interestPointCategory.name,
      latitude: interestPointCategory.latitude,
      longitude: interestPointCategory.longitude,
      createdAt: interestPointCategory.createdAt.toISOString(),
      updatedAt: interestPointCategory.updatedAt?.toISOString(),
    };
  }
}

export namespace CreateInterestPoint {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    name: string;
    description: string | null;
    latitude: number;
    longitude: number;
    interestPointCategoryId: string;
  };
  export type Output = Promise<Response>;
  type Response = {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string | null;
  };
}
