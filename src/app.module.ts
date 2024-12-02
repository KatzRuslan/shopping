import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { AppService } from './app.service';

@Module({
    imports: [ApiModule],
    controllers: [],
    providers: [AppService],
    exports: [AppService]
})
export class AppModule {}
