import { Provider } from '@nestjs/common';
import { BcryptHashAdapter } from '../hash/bcrypt-hash.adapter';
import { SharedProvider } from '../shared-provider';

export class HashGeneratorProviderFactory {
  static generate(): Provider {
    return {
      provide: SharedProvider.HASH_GENERATOR,
      useFactory: () => {
        return new BcryptHashAdapter();
      },
      inject: [],
    };
  }
}
