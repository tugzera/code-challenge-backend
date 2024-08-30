import { UserTypeormModel } from '../../../shared/database/models/user.model';
import { BaseTypeormRepository } from '../../../shared/database/repositories/base-typeorm.repository';
import { UserRepository } from '../../../users/domain/repositories';
import { User } from '../../../users/domain/user';

export class UserTypeormRepository
  extends BaseTypeormRepository<UserTypeormModel, User>
  implements UserRepository {}
