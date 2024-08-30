import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseTypeormModel } from './base.model';
import { InterestPointTypeormModel } from './interest-point.model';

@Index('idx__uq__interest_point_name', ['deletedAt', 'name'], { unique: true })
@Index('pk__interest_point_categories', ['id'], { unique: true })
@Index('idx__part__uq__interest_point_name', ['name'], { unique: true })
@Entity('interest_point_categories', { schema: 'public' })
export class InterestPointCategoryTypeormModel extends BaseTypeormModel {
  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @OneToMany(
    () => InterestPointTypeormModel,
    (interestPoints) => interestPoints.interestPointCategory,
  )
  interestPoints: InterestPointTypeormModel[];

  constructor(props: Partial<InterestPointCategoryTypeormModel>) {
    super();
    Object.assign(this, props);
  }
}
