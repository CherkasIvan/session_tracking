import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const config = await app.get(ConfigService);
  const port = config.get<number>('PORT');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Hotel booking rooms api. Test task')
    .setDescription('The hotel accounts API description')
    .setVersion('1.0')
    .addTag('Booking hotel rooms')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const whiteList = [];
  app.enableCors({
    origin: whiteList,
  });

  await app.listen(port, () => {
    console.log(`App started om port ${port}`);
  });
}
bootstrap();
