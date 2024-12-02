import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly _productsService: ProductsService) {}
    @Get()
    async getProducts() {
        return this._productsService.getProducts();
    }
    @Post()
    async postProduct(@Body() { product, base64 }) {
        return this._productsService.postProduct(product, base64);
    }
    @Put(':id')
    async putProduct(@Param('id') id: string, @Body() { product, base64 }) {
        return this._productsService.putProduct(id, product, base64);
    }
    @Delete()
    async deleteProduct() {
        return this._productsService.getProducts();
    }
}
