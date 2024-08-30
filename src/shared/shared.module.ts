import { Global, Module } from '@nestjs/common';
import { ConnectionProviderFactory } from './infra/ioc/providers/database-connection.provider';
import { HashGeneratorProviderFactory } from './infra/ioc/providers/hash-generator.provider';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    ConnectionProviderFactory.generate(),
    HashGeneratorProviderFactory.generate(),
  ],
  exports: [
    ConnectionProviderFactory.generate(),
    HashGeneratorProviderFactory.generate(),
  ],
})
export class SharedModule {}
