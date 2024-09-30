import { Module } from '@nestjs/common';
import { UserAvatarService } from './avatar.service';
import { UserAvatarController } from './avatar.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAvatar } from './entity/avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAvatar])],
  providers: [UserAvatarService],
  controllers: [UserAvatarController],
})
export class AvatarModule {}
