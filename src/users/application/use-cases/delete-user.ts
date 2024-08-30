import { UserNotFoundException } from 'src/users/domain/exceptions';
import { UserRepository } from '../../domain/repositories';

export class DeleteUser implements DeleteUser.Contract {
  constructor(private userRepository: UserRepository) {}

  async execute(input: DeleteUser.Input): DeleteUser.Output {
    const user = await this.userRepository.findByParam({
      key: 'id',
      value: input.userId,
    });
    if (!user) throw new UserNotFoundException();
    await this.userRepository.softDelete(user.id);
  }
}

export namespace DeleteUser {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = {
    userId: string;
  };
  export type Output = Promise<void>;
}
