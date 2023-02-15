import { Test, TestingModule } from '@nestjs/testing';
import { CreateRoomsService } from './create-rooms.service';

describe('CreateRoomsService', () => {
  let service: CreateRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateRoomsService],
    }).compile();

    service = module.get<CreateRoomsService>(CreateRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
