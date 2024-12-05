import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
// import { Response, Request } from 'express'; // , Res, Req
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly _categoryService: CategoryService) {}
    @Get()
    async getCategories() {
        return this._categoryService.getCategories();
    }
    @Post()
    async postCategory(@Body() { category, base64 }) {
        return this._categoryService.postCategory(category, base64);
    }
    @Put(':id')
    async putCategory(@Param('id') id: string, @Body() { category, base64 }) {
        return this._categoryService.putCategory(id, category, base64);
    }
    @Delete(':id')
    async deleteCategory(@Param('id') id: string) {
        return this._categoryService.deleteCategory(id);
    }
}
