import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { configService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Hotel booking rooms api. Test task')
    .setDescription('The hotel accounts API description')
    .setVersion('1.0')
    .addTag('Booking hotel rooms')
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const whiteList = [];
  app.enableCors({
    origin: whiteList,
  });

  await app.listen(configService.getPort());
}
bootstrap();
