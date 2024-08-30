import { UserEmailAlreadyRegisteredException } from 'src/users/domain/exceptions';
import { HashGenerator } from '../../../shared/domain/contracts/hash-generator';
import { User } from '../../../users/domain/entities/user';
import { UserRepository } from '../../domain/repositories';

export class CreateUser implements CreateUser.Contract {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(input: CreateUser.Input): CreateUser.Output {
    const passwordHash = this.hashGenerator.hash(input.password);
    const userAlreadyRegistered = await this.userRepository.findByParam({
      key: 'email',
      value: input.email,
    });
    if (userAlreadyRegistered) throw new UserEmailAlreadyRegisteredException();
    const user = User.create({
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      password: passwordHash,
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
