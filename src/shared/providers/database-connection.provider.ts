import { Provider } from '@nestjs/common';
import { TypeormConnection } from '../database/typeorm-connection';
import { SharedProvider } from '../shared-provider';

export class ConnectionProviderFactory {
  static generate(): Provider {
    return {
      provide: SharedProvider.DATABASE_CONNECTION,
      useFactory: () => {
        return new TypeormConnection().connect();
      },
      inject: [],
    };
  }
}
