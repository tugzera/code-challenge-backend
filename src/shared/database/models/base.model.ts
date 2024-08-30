import { BaseEntity, Column, PrimaryColumn } from 'typeorm';

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
