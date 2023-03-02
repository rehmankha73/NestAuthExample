import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 9000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Your serve is running on port: ${port}`);
}
bootstrap();
