import { BaseMapper } from 'src/shared/infra/database/mapper/base.mapper';
import { UserTypeormModel } from 'src/shared/infra/database/models/user.model';
import { User } from 'src/users/domain/entities/user';

export class UserTypeormMapper implements BaseMapper<User, UserTypeormModel> {
  entityToModel(domain: User): UserTypeormModel {
    return new UserTypeormModel({
      id: domain.id,
      email: domain.email,
      firstName: domain.firstName,
      lastName: domain.lastName,
      passwordHash: domain.password,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      deletedAt: domain.deletedAt,
    });
  }

  modelToEntity(model: UserTypeormModel): User {
    const user = new User({
      id: model.id,
      alternativeId: model.alternativeId,
      email: model.email,
      firstName: model.firstName,
      lastName: model.lastName,
      password: model.passwordHash,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
      deletedAt: model.deletedAt,
    });
    return user;
  }
}
