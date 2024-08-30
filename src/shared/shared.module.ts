import { Global, Module } from '@nestjs/common';
import { ConnectionProviderFactory } from './providers/database-connection.provider';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [ConnectionProviderFactory.generate()],
  exports: [],
})
export class SharedModule {}
