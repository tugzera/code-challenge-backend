import { InterestPointCategory } from '../domain/entities';
import { InterestPointCategoryRepository } from '../domain/repositories';

export class CreateInterestPointCategory
  implements CreateInterestPointCategory.Contract
{
  constructor(
    private interestPointCategoryRepository: InterestPointCategoryRepository,
  ) {}

  async execute(
    input: CreateInterestPointCategory.Input,
  ): CreateInterestPointCategory.Output {
    const interestPointCategory = InterestPointCategory.create({
      name: input.name,
    });
    await this.interestPointCategoryRepository.save(interestPointCategory);
    return {
      id: interestPointCategory.id,
      name: interestPointCategory.name,
      createdAt: interestPointCategory.createdAt.toISOString(),
      updatedAt: interestPointCategory.updatedAt?.toISOString(),
    };
  }
}

export namespace CreateInterestPointCategory {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    name: string;
  };
  export type Output = Promise<Response>;
  type Response = {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string | null;
  };
}
