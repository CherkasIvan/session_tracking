import { Test, TestingModule } from '@nestjs/testing';
import { ManageRoomsService } from './manage-rooms.service';

describe('RoomService', () => {
  let service: ManageRoomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageRoomsService],
    }).compile();

    service = module.get<ManageRoomsService>(ManageRoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
