import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';

@Controller('subcategory')
export class SubcategoryController {
    constructor(private readonly _subcategoryService: SubcategoryService) {}
    @Get()
    async getSubcategories() {
        return this._subcategoryService.getSubcategories();
    }
    @Post()
    async postSubcategory(@Body() { subcategory, base64 }) {
        return this._subcategoryService.postSubcategory(subcategory, base64);
    }
    @Put(':id')
    async putSubcategory(@Param('id') id: string, @Body() { subcategory, base64 }) {
        return this._subcategoryService.putSubcategory(id, subcategory, base64);
    }
    @Delete()
    async deleteSubcategory() {
        return this._subcategoryService.getSubcategories();
    }
}
