import { Provider } from '@nestjs/common';
import { HashGenerator } from '../../../../shared/domain/contracts/hash-generator';
import { BcryptHashAdapter } from '../../hash/bcrypt-hash.adapter';
import { SharedProvider } from '../shared-provider';

export class HashGeneratorProviderFactory {
  static generate(): Provider {
    return {
      provide: SharedProvider.HASH_GENERATOR,
      useFactory: (): HashGenerator => {
        return new BcryptHashAdapter();
      },
      inject: [],
    };
  }
}
