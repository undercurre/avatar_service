import { Test, TestingModule } from '@nestjs/testing';
import { UserAvatarService } from './avatar.service';

describe('AvatarService', () => {
  let service: UserAvatarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAvatarService],
    }).compile();

    service = module.get<UserAvatarService>(UserAvatarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
