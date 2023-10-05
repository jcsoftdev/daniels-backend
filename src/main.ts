import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('process.env.PORT', process.env.PORT);
  console.log('process.env.MONGO_URI', process.env.MONGO_URI);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();
  await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
