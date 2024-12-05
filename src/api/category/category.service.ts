import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class CategoryService {
    constructor(private readonly _appService: AppService) {}
    public async getCategories() {
        const categories = this._appService.dbGet('categories');
        return categories;
    }
    public async postCategory(category, base64: string) {
        const id = this._appService.createGUID('XXXX-catXXX-4XXY-YXXXXXX');
        this._appService.dbPost('categories', { id, ...category, icon: '' }, 'name');
        const icon = base64 ? this._appService.createImage(base64, `categories/${id}`) : category.icon;
        this._appService.dbPut('categories', id, { icon });
        return { id, ...category, icon };
    }
    public async putCategory(id: string, category, base64: string) {
        this._appService.dbPut('categories', id, category);
        if (base64) {
            this._appService.createImage(base64, `categories/${id}`);
        }
        return { ok: true };
    }
}
