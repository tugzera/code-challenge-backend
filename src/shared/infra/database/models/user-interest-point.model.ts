import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseTypeormModel } from './base.model';
import { InterestPointModel } from './interest-point.model';
import { UserTypeormModel } from './user.model';

@Index(
  'idx__uq__user_interest_point',
  ['deletedAt', 'interestPointId', 'userId'],
  { unique: true },
)
@Index('pk__user_interest_points', ['id'], { unique: true })
@Index('idx__part__uq__user_interest_point', ['interestPointId', 'userId'], {
  unique: true,
})
@Entity('user_interest_points', { schema: 'public' })
export class UserInterestPointModel extends BaseTypeormModel {
  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'interest_point_id' })
  interestPointId: string;

  @ManyToOne(
    () => InterestPointModel,
    (interestPoints) => interestPoints.userInterestPoints,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'interest_point_id', referencedColumnName: 'id' }])
  interestPoint: InterestPointModel;

  @ManyToOne(() => UserTypeormModel, (users) => users.userInterestPoints, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: UserTypeormModel;
}
