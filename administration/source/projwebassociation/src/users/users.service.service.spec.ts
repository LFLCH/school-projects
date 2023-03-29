import { Test, TestingModule } from '@nestjs/testing';
import { UsersServiceService } from './users.service.service';

describe('UsersServiceService', () => {
  let service: UsersServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersServiceService],
    }).compile();

    service = module.get<UsersServiceService>(UsersServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
