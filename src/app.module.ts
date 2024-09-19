import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [
    CommonModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    SessionsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
