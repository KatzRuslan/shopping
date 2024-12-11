import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AppService } from 'src/app.service';

@Module({
    imports: [HttpModule],
    controllers: [ProductsController],
    providers: [ProductsService, AppService]
})
export class ProductsModule {}
