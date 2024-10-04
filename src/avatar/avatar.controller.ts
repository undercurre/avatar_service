import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserAvatarService } from './avatar.service';
import { CreateUserAvatarDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@Controller('user-avatar')
export class UserAvatarController {
  constructor(private readonly userAvatarService: UserAvatarService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars', // 保存文件的目录
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    // 返回上传文件的路径或URL
    const url = `http://localhost:3001/uploads/avatars/${file.filename}`;
    return { url };
  }

  @Post('create')
  create(@Body() createUserAvatarDto: CreateUserAvatarDto) {
    return this.userAvatarService.create(createUserAvatarDto);
  }

  @Get(':userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.userAvatarService.findByUserId(userId);
  }

  @Put(':userId')
  updateAvatar(
    @Param('userId') userId: string,
    @Body('avatarUrl') avatarUrl: string,
  ) {
    return this.userAvatarService.updateAvatar(userId, avatarUrl);
  }
}
