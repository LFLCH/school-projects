import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    { 'origin':'http://localhost:4200' }
  );
  app.use(helmet());
  const config = new DocumentBuilder()
  .setTitle('Gestion des Associations')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    },
    'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
  )
  .build();
  const document = SwaggerModule.createDocument(app, config);
  const options = {
    swaggerOptions: {
      authAction: {
        defaultBearerAuth: {
          name: 'JWT-auth',
          schema: {
            description: 'Default',
            type: 'http',
            in: 'header',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
          value: 'thisIsASampleBearerAuthToken123',
        },
      },
    },
  };
  SwaggerModule.setup('api', app, document,options);
  await app.listen(3000);
}
bootstrap();
