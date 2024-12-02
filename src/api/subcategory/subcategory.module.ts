import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { AppService } from 'src/app.service';

@Module({
    controllers: [SubcategoryController],
    providers: [SubcategoryService, AppService]
})
export class SubcategoryModule {}
