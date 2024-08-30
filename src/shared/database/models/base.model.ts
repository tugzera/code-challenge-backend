import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Index('idx__uq__interest_point_name', ['deletedAt', 'name'], { unique: true })
@Index('pk__interest_point_categories', ['id'], { unique: true })
@Index('idx__part__uq__interest_point_name', ['name'], { unique: true })
@Entity('interest_point_categories', { schema: 'public' })
export class BaseTypeormModel extends BaseEntity {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string;

  @Column({ type: 'bigint', name: 'alternative_id' })
  alternativeId: number;

  @Column('timestamp with time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}
