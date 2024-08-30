import { BaseRepository } from 'src/shared/domain/repositories';
import { User } from '../entities/user';

export interface UserRepository extends BaseRepository<User> {}
