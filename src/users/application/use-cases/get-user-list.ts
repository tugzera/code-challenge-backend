import {
  PaginationProps,
  PaginationResponseProps,
} from 'src/shared/domain/types';
import { PaginationHelper } from 'src/shared/infra/helpers/pagination-helper';
import { User } from 'src/users/domain/entities/user';
import { UserRepository } from '../../domain/repositories';

export class GetUserList implements GetUserList.Contract {
  constructor(private userRepository: UserRepository) {}

  async execute(input: GetUserList.Input): GetUserList.Output {
    const { items, count } = await this.userRepository.getAll(input);
    return PaginationHelper.makePagination<GetUserList.Response>({
      items: items.map(
        (item): GetUserList.Response => ({
          id: item.id,
          email: item.email,
          firstName: item.firstName,
          lastName: item.lastName,
        }),
      ),
      count,
      page: input.page,
      pageSize: input.pageSize,
    });
  }
}

export namespace GetUserList {
  export interface Contract {
    execute(input: Input): Output;
  }
  export type Input = PaginationProps<User>;
  export type Output = Promise<PaginationResponseProps<Response>>;
  export type Response = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  export enum SortBy {
    CREATED_AT = 'createdAt',
    UPDATED_AT = 'updatedAt',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
    EMAIL = 'email',
  }
}
