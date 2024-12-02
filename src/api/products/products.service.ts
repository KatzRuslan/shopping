import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class ProductsService {
    constructor(private readonly _appService: AppService) {}
    public async getProducts() {
        const products = this._appService.dbGet('products');
        return products;
    }
    public async postProduct(product, base64: string) {
        const id = this._appService.createGUID('XXXX-product-4XXY-YXXXXXX');
        this._appService.dbPost('products', { id, ...product, image: '' }, 'name');
        const image = base64 ? this._appService.createImage(base64, `products/${id}`) : product.image;
        this._appService.dbPut('products', id, { image });
        return { id };
    }
    public async putProduct(id: string, product, base64: string) {
        this._appService.dbPut('products', id, product);
        if (base64) {
            this._appService.createImage(base64, `products/${id}`);
        }
        return { ok: true };
    }
}
