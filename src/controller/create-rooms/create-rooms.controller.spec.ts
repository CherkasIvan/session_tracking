import { Test, TestingModule } from '@nestjs/testing';
import { CreateRoomsController } from './create-rooms.controller';

describe('CreateRoomsController', () => {
  let controller: CreateRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateRoomsController],
    }).compile();

    controller = module.get<CreateRoomsController>(CreateRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
