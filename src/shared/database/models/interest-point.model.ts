import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseTypeormModel } from './base.model';
import { InterestPointCategoryModel } from './interest-point-category.model';
import { UserInterestPointModel } from './user-interest-point.model';

@Index('pk__interest_points', ['id'], { unique: true })
@Entity('interest_points', { schema: 'public' })
export class InterestPointModel extends BaseTypeormModel {
  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('geometry', { name: 'position' })
  position: string;

  @ManyToOne(
    () => InterestPointCategoryModel,
    (interestPointCategories) => interestPointCategories.interestPoints,
    { onDelete: 'RESTRICT', onUpdate: 'CASCADE' },
  )
  @JoinColumn([
    { name: 'interest_point_category_id', referencedColumnName: 'id' },
  ])
  interestPointCategory: InterestPointCategoryModel;

  @OneToMany(
    () => UserInterestPointModel,
    (userInterestPoints) => userInterestPoints.interestPoint,
  )
  userInterestPoints: UserInterestPointModel[];
}
