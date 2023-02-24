import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 6000;
  await app.listen(port);
  console.log(`Your serve is running on port: ${port}`);
}
bootstrap();
