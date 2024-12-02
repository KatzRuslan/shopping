import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';

@Module({
    imports: [ProductsModule, CategoryModule, SubcategoryModule],
    controllers: [],
    providers: []
})
export class ApiModule {}
