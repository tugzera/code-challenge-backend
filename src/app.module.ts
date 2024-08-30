import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InterestPointModule } from './interest-points/interest-point.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    UserModule,
    InterestPointModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
