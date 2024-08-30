import { BaseEntity } from '../../../shared/domain/entities';

export class InterestPointCategory extends BaseEntity {
  name: string;

  constructor(props: Partial<InterestPointCategory>) {
    super(props);
    Object.assign(this, props);
  }

  static create(props: { name: string }) {
    return new InterestPointCategory({
      name: props.name,
    });
  }
}
