import { UserTypeormModel } from '../../../../shared/infra/database/models/user.model';
import { BaseTypeormRepository } from '../../../../shared/infra/database/repositories/base-typeorm.repository';
import { UserRepository } from '../../../domain/repositories';
import { User } from '../../../domain/user';

export class UserTypeormRepository
  extends BaseTypeormRepository<UserTypeormModel, User>
  implements UserRepository {}
