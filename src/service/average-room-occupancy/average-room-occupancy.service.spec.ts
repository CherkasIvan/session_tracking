import { Test, TestingModule } from '@nestjs/testing';

import { AverageRoomOccupancyService } from './average-room-occupancy.service';

describe('AverageRoomOccupancyService', () => {
  let service: AverageRoomOccupancyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AverageRoomOccupancyService],
    }).compile();

    service = module.get<AverageRoomOccupancyService>(
      AverageRoomOccupancyService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
