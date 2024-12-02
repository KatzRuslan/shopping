import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.use(express.static('public', { maxAge: 3600000 }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    app.enableCors();
    const port = 3004; // process.env.PORT ?? 3000
    await app.listen(port);
    console.log(`Application is listening at ${port} port`);
}
bootstrap();
