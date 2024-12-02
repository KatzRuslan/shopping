import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class SubcategoryService {
    constructor(private readonly _appService: AppService) {}
    public async getSubcategories() {
        const subcategories = this._appService.dbGet('subcategories');
        return subcategories;
    }
    public async postSubcategory(subcategory, base64: string) {
        const id = this._appService.createGUID('Xsub-category-4XXY-YXXXXXX');
        const icon = base64 ? this._appService.createImage(base64, `subcategories/${id}`) : subcategory.icon;
        this._appService.dbPost('subcategories', { id, ...subcategory, icon }, 'name');
        return { id };
    }
    public async putSubcategory(id: string, subcategory, base64: string) {
        this._appService.dbPut('subcategories', id, subcategory);
        if (base64) {
            this._appService.createImage(base64, `subcategories/${id}`);
        }
        return { ok: true };
    }
}
