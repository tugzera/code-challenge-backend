import { BaseEntity } from '../../../shared/domain/entities';

export class InterestPoint extends BaseEntity {
  name: string;
  description: string | null;
  latitude: number;
  longitude: number;
  interestPointCategoryId: string;

  constructor(props: Partial<InterestPoint>) {
    super(props);
    Object.assign(this, props);
  }

  static create(props: {
    name: string;
    latitude: number;
    longitude: number;
    description: string | null;
    interestPointCategoryId: string;
  }) {
    return new InterestPoint({
      latitude: props.latitude,
      longitude: props.longitude,
      description: props.description,
      name: props.name,
      interestPointCategoryId: props.interestPointCategoryId,
    });
  }
}
