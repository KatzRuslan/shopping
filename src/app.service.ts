import { HttpException, Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class AppService {
    private get _dataBaseUrl() {
        return join(__dirname, '../', 'public/database.json');
    }
    private _readDataBase() {
        return JSON.parse(fs.readFileSync(this._dataBaseUrl, 'utf8'));
    }
    private _writeDataBase(dataBase) {
        fs.writeFileSync(this._dataBaseUrl, JSON.stringify(dataBase, null, '\t'), 'utf8');
    }
    //
    public dbGet(key: string) {
        const dataBase = this._readDataBase();
        return dataBase[key];
    }
    public dbPost<T>(key: string, node: T, check = 'name') {
        const dataBase = this._readDataBase();
        if (dataBase[key].find((item) => item[check] === node[check])) {
            throw new HttpException({ header: 'Error', message: `"${node[check]}" allready exist in "${key}"` }, 400);
        }
        dataBase[key].push(node);
        this._writeDataBase(dataBase);
        return true;
    }
    public dbPut<T>(key: string, id: string, node: T | any, check = 'name') {
        const dataBase = this._readDataBase();
        if (dataBase[key].find((item) => item[check] === node[check] && item.id !== node.id)) {
            throw new HttpException({ header: 'Error', message: `"${node[check]}" allready exist in "${key}"` }, 400);
        }
        const list = dataBase[key];
        dataBase[key] = list;
        const nodeIndex = list.findIndex((item) => item.id === id);
        list[nodeIndex] = { ...list[nodeIndex], ...node };
        this._writeDataBase(dataBase);
        return true;
    }
    //
    createGUID(mask = 'XXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXX') {
        let d = new Date().getTime(); //Timestamp
        let d2 = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
        return mask.replace(/[XY]/g, function (c) {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'X' ? r : (r & 0x3) | 0x8).toString(16);
        });
    }
    createImage(base64: string, name: string) {
        const buffer = Buffer.from(base64, 'base64');
        const filename = `images/${name}.png`;
        const filepath = join(__dirname, '../', filename);
        fs.writeFileSync(filepath, buffer);
        return filename;
    }
}
