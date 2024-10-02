import { Module } from '@nestjs/common';
import { UserAvatarService } from './avatar.service';
import { UserAvatarController } from './avatar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAvatar } from './entity/avatar.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([UserAvatar]), AuthModule],
  providers: [
    UserAvatarService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [UserAvatarController],
})
export class AvatarModule {}
