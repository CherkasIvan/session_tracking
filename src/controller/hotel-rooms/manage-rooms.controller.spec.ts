import { Test, TestingModule } from '@nestjs/testing';

import { ManageRoomsController } from './manage-rooms.controller';

describe('ManageRoomsController', () => {
  let controller: ManageRoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageRoomsController],
    }).compile();

    controller = module.get<ManageRoomsController>(ManageRoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
