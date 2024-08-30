import { User } from '../domain/user';
import { UserRepository } from '../repositories';

export class CreateUser implements CreateUser.Contract {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUser.Input): CreateUser.Output {
    const user = User.create({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      passwordHash: input.password,
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
