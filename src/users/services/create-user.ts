import { HashGenerator } from 'src/shared/contracts/hash-generator';
import { User } from '../domain/user';
import { UserRepository } from '../repositories';

export class CreateUser implements CreateUser.Contract {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(input: CreateUser.Input): CreateUser.Output {
    const passwordHash = this.hashGenerator.hash(input.password);
    const user = User.create({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      passwordHash,
    });
    await this.userRepository.save(user);
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}

export namespace CreateUser {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  export type Output = Promise<Response>;
  type Response = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
