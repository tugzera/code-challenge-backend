import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { typeormConfig } from '../../database/config';
import { TypeormConnection } from '../../database/typeorm-connection';
import { SharedProvider } from '../shared-provider';

export class ConnectionProviderFactory {
  static generate(): Provider {
    return {
      provide: SharedProvider.DATABASE_CONNECTION,
      useFactory: async (): Promise<DataSource> => {
        return new TypeormConnection({ config: typeormConfig }).connect();
      },
      inject: [],
    };
  }
}
