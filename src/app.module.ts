import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../../', '/client/dist/client/browser'),
            exclude: ['/api/(.*)']
        }),
        ApiModule
    ],
    controllers: [],
    providers: [AppService],
    exports: [AppService]
})
export class AppModule {}
