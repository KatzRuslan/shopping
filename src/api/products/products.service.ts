import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppService } from 'src/app.service';

@Injectable()
export class ProductsService {
    constructor(
        private readonly _appService: AppService,
        private readonly _httpService: HttpService
    ) {}
    public async getProducts() {
        const products = this._appService.dbGet('products');
        return products;
    }
    public async postProduct(product, base64: string) {
        const id = this._appService.createGUID('XXXX-product-4XXY-YXXXXXX');
        this._appService.dbPost('products', { id, ...product, image: '' }, 'name');
        const image = base64 ? this._appService.createImage(base64, `products/${id}`) : product.image;
        this._appService.dbPut('products', id, { image });
        return { id, ...product, image };
    }
    public async putProduct(id: string, product, base64: string) {
        this._appService.dbPut('products', id, product);
        if (base64) {
            this._appService.createImage(base64, `products/${id}`);
        }
        return { ok: true };
    }
    public async deleteProduct(id: string) {
        this._appService.dbDelete('products', id);
        this._appService.deleteImage(`products/${id}`);
        return { ok: true };
    }
    public async startCrawling() {
        const baseUrl = 'https://shop.hazi-hinam.co.il/proxy';
        const headers = await this._httpService.axiosRef
            .get(`${baseUrl}/init`)
            .then(({ headers }) => `${headers['set-cookie']}`.split(';'))
            .then((list) => [list[0], list[14].split(',')[1]].join(';'))
            .then((cookie) => ({ cookie }))
            .catch(({ response }) => {
                const { status, statusText } = response;
                const error = { header: 'Ошибка', message: '' };
                switch (statusText) {
                    case '':
                        error.message = 'Unauthorized';
                        break;
                    case 'Not Found':
                        error.message = 'Страница не найдена';
                        break;
                    default:
                        error.message = statusText;
                        break;
                }
                throw new HttpException({ error }, status);
            });
        const products = await this.getProducts();
        let promises = products.map(async ({ id, name, crawlingId, price, measureId }) => {
            if (crawlingId === 'none') {
                return undefined;
            }
            // eslint-disable-next-line prefer-const
            let { newprice, quantityType } = await this._httpService.axiosRef.get(`${baseUrl}/api/item/${crawlingId}`, { headers }).then(({ data }) => {
                if (data.IsOK) {
                    return {
                        newprice: data.Results.Item.Price_Regular,
                        quantityType: data.Results.Item.ItemQuantityTypes.Types[0].Type
                    };
                } else {
                    throw new HttpException({ error: { header: 'Ошибка', message: `Продукт "${name}" не найден` } }, 502);
                }
            });
            if (measureId === 'gram' && quantityType === 2) {
                newprice = parseFloat((newprice / 10).toFixed(2));
            }
            if (price === newprice) {
                return undefined;
            }
            return { id, price: newprice };
        });
        const updates = await Promise.all(promises);
        promises = updates
            .filter((data) => data)
            .map(async ({ id, price }) => {
                await this.putProduct(id, { price }, '');
                return true;
            });
        await Promise.all(promises);
        return this.getProducts();
    }
}
