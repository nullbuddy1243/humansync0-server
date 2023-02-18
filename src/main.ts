import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

require('dotenv').config()

async function bootstrap() {
  console.log(`humansync0-server starting on port: ${process.env.port} \n`);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.port);
}
bootstrap();
