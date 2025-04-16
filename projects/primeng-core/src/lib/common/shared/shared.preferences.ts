import { Injectable } from "@angular/core";
import { CipherService } from "../../security/cipher.service";

@Injectable({
    providedIn: 'root'
})
export class SharedPreferences {

    constructor(private crypte: CipherService) {
    }

    public put(key: any, data: any) {
        this.crypte.setEncrypt(key, data);
    }

    public set(key: string, data: any) {
        this.crypte.setEncrypt(key, data);
    }

    public get(key: string): any {
        return this.crypte.getEncrypt(key);
    }

    public clear(key: string) {
        this.crypte.clearEncrypt(key);
    }
}
