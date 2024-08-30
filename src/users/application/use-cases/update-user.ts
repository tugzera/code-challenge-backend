import {
  UserEmailAlreadyRegisteredException,
  UserNotFoundException,
} from 'src/users/domain/exceptions';
import { HashGenerator } from '../../../shared/domain/contracts/hash-generator';
import { UserRepository } from '../../domain/repositories';

export class UpdateUser implements UpdateUser.Contract {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute(input: UpdateUser.Input): UpdateUser.Output {
    const user = await this.userRepository.findByParam({
      key: 'id',
      value: input.userId,
    });
    if (!user) throw new UserNotFoundException();
    await this.validateChangeEmail({
      currentEmail: user.email,
      desiredEmail: input.email,
    });
    const passwordHash = this.hashPassword(input.password);
    user.update({
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
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }

  private async validateChangeEmail(input: {
    currentEmail: string;
    desiredEmail?: string;
  }) {
    const { desiredEmail, currentEmail } = input;
    if (desiredEmail && currentEmail !== desiredEmail) {
      const userAlreadyRegistered = await this.userRepository.findByParam({
        key: 'email',
        value: desiredEmail,
      });
      if (userAlreadyRegistered)
        throw new UserEmailAlreadyRegisteredException();
    }
  }

  private hashPassword(password?: string) {
    return password ? this.hashGenerator.hash(password) : undefined;
  }
}

export namespace UpdateUser {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    userId: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  };
  export type Output = Promise<Response>;
  type Response = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}
