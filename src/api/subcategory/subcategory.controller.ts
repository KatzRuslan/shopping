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
    async postSubcategory(@Body() { subcategory }) {
        return this._subcategoryService.postSubcategory(subcategory);
    }
    @Put(':id')
    async putSubcategory(@Param('id') id: string, @Body() { subcategory }) {
        return this._subcategoryService.putSubcategory(id, subcategory);
    }
    @Delete(':id')
    async deleteSubcategory(@Param('id') id: string) {
        return this._subcategoryService.deleteSubcategory(id);
    }
}
