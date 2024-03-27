import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors({
    origin: [
      'https://react-app-task-board.netlify.app',
      'https://react-app-task-board.netlify.app/',
    ],
  });

  // Configure a Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Board API')
    .setDescription('Task Board API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}\nAPI documentation is available at http://localhost:${PORT}/api/docs`,
    );
  });
}

bootstrap();
