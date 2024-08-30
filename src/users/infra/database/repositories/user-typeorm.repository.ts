import { PaginationProps } from 'src/shared/domain/types';
import { User } from 'src/users/domain/entities/user';
import { Brackets } from 'typeorm';
import { UserTypeormModel } from '../../../../shared/infra/database/models/user.model';
import { BaseTypeormRepository } from '../../../../shared/infra/database/repositories/base-typeorm.repository';
import { UserRepository } from '../../../domain/repositories';

export class UserTypeormRepository
  extends BaseTypeormRepository<UserTypeormModel, User>
  implements UserRepository
{
  async getAll({
    page,
    pageSize,
    searchString,
    sortBy,
    sortDirection,
  }: PaginationProps<User>): Promise<{ items: User[]; count: number }> {
    const query = this.repository.createQueryBuilder('users');
    const dbPageIndex = page - 1;
    query.skip(dbPageIndex * pageSize).take(pageSize);
    if (searchString) {
      const words = searchString.split(' ');
      query.where(
        new Brackets((qb) => {
          words.forEach((word) => {
            qb.orWhere('users.firstName ILIKE :word', {
              word: `%${word}%`,
            });
            qb.orWhere('users.lastName ILIKE :word', {
              word: `%${word}%`,
            });
            qb.orWhere('users.email ILIKE :word', {
              word: `%${word}%`,
            });
          });
        }),
      );
    }
    if (sortBy && sortDirection) {
      query.orderBy(`users.${sortBy}`, sortDirection);
    }
    const [items, count] = await query.getManyAndCount();
    return {
      items: items.map((model) => this.mapper.modelToEntity(model)),
      count,
    };
  }
}
