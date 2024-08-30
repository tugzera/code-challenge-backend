import { BaseRepository } from 'src/shared/domain/repositories';
import { PaginationProps } from 'src/shared/domain/types';
import { User } from '../entities/user';

export interface UserRepository extends BaseRepository<User> {
  getAll(input: PaginationProps<User>): Promise<{
    items: User[];
    count: number;
  }>;
}
