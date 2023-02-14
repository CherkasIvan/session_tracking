import { Test, TestingModule } from '@nestjs/testing';
import { HotelRoomsController } from './hotel-rooms.controller';

describe('HotelRoomsController', () => {
  let controller: HotelRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelRoomsController],
    }).compile();

    controller = module.get<HotelRoomsController>(HotelRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
