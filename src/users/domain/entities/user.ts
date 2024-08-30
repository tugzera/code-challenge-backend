import { BaseEntity } from '../../../shared/domain/entities';

export class User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(props: Partial<User> = {}) {
    super(props);
    Object.assign(this, props);
  }

  static create(props: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    // metodo de criação separado para fazer validações ou algo assim
    // if (props.email.length > 100) {
    //   throw new Error('Email is too long');
    // }
    return new User({
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
    });
  }
}
