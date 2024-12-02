import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AppService } from 'src/app.service';

@Module({
    controllers: [CategoryController],
    providers: [CategoryService, AppService]
})
export class CategoryModule {}
