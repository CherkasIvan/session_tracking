import { Test, TestingModule } from '@nestjs/testing';
import { AverageRoomOccupancyController } from './average-room-occupancy.controller';

describe('AverageRoomOccupancyController', () => {
  let controller: AverageRoomOccupancyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AverageRoomOccupancyController],
    }).compile();

    controller = module.get<AverageRoomOccupancyController>(AverageRoomOccupancyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
