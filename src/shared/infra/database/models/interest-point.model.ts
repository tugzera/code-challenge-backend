import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseTypeormModel } from './base.model';
import { InterestPointCategoryTypeormModel } from './interest-point-category.model';
import { UserInterestPointTypeormModel } from './user-interest-point.model';

@Index('pk__interest_points', ['id'], { unique: true })
@Entity('interest_points', { schema: 'public' })
export class InterestPointTypeormModel extends BaseTypeormModel {
  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('point', { name: 'position' })
  position: string | object;

  @Column('uuid', { name: 'interest_point_category_id' })
  interestPointCategoryId: string;

  @ManyToOne(
    () => InterestPointCategoryTypeormModel,
    (interestPointCategories) => interestPointCategories.interestPoints,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'interest_point_category_id', referencedColumnName: 'id' },
  ])
  interestPointCategory: InterestPointCategoryTypeormModel;

  @OneToMany(
    () => UserInterestPointTypeormModel,
    (userInterestPoints) => userInterestPoints.interestPoint,
  )
  userInterestPoints: UserInterestPointTypeormModel[];

  constructor(props: Partial<InterestPointTypeormModel>) {
    super();
    Object.assign(this, props);
  }
}
