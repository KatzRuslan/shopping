import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(join(__dirname, '..', 'images'), {
        index: false,
        prefix: '/images'
    });
    app.setGlobalPrefix('api');
    app.use(express.static('public', { maxAge: 3600000 }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    app.enableCors();
    const port = process.env.PORT ?? 3004;
    await app.listen(port);
    console.log(`Application is listening at ${port} port`);
}
bootstrap();
