import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use DocumentBuilder to create a new Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Task Board API') // Set the title of the API
    .setDescription('Task Board API description') // Set the description of the API
    .setVersion('0.1') // Set the version of the API
    .build(); // Build the document

  // Create a Swagger document using the application instance and the document configuration
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

bootstrap();
