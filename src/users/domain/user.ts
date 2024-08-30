import { BaseEntity } from '../../shared/domain/base.entity';

export class User extends BaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;

  constructor(props: Partial<User> = {}) {
    super(props);
    this.firstName = props.firstName || '';
    this.lastName = props.lastName || '';
    this.email = props.email || '';
    this.passwordHash = props.passwordHash || '';
  }

  static create(props: {
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
  }) {
    // metodo de criação separado para fazer validações ou algo assim
    // if (props.email.length > 100) {
    //   throw new Error('Email is too long');
    // }
    return new User({
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      passwordHash: props.passwordHash,
    });
  }
}
