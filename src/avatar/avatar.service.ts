import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAvatar } from './entity/avatar.entity';
import { CreateUserAvatarDto } from './dto/create.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserAvatarService {
  private readonly uploadPath = path.join(
    __dirname,
    '..',
    '..',
    'uploads',
    'avatars',
  );

  constructor(
    @InjectRepository(UserAvatar)
    private userAvatarRepository: Repository<UserAvatar>,
  ) {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async create(createUserAvatarDto: CreateUserAvatarDto): Promise<UserAvatar> {
    const userAvatar = this.userAvatarRepository.create(createUserAvatarDto);
    return this.userAvatarRepository.save(userAvatar);
  }

  async findByUserId(userId: string): Promise<UserAvatar> {
    return this.userAvatarRepository.findOne({ where: { user_id: userId } });
  }

  async updateAvatar(userId: string, avatarUrl: string): Promise<void> {
    await this.userAvatarRepository.update(
      { user_id: userId },
      { avatar_url: avatarUrl },
    );
  }

  async saveFile(file: Express.Multer.File): Promise<string> {
    const filePath = path.join(this.uploadPath, file.filename);
    fs.writeFileSync(filePath, file.buffer);
    return filePath;
  }
}
