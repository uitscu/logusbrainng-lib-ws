import { Inject, Injectable } from '@angular/core';
import { CLIENT_ID, CLIENT_KEY, LOGUSBRAIN_ID, LOGUSBRAIN_KEY } from '../common/utils/constants.utility';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class CipherService {

  constructor(
    @Inject(LOGUSBRAIN_ID) private lbId: string,
    @Inject(LOGUSBRAIN_KEY) private lbKey: string,
    @Inject(CLIENT_ID) private clientId: string,
    @Inject(CLIENT_KEY) private clientKey: string) { }

  private get secretKey(): string {
    return btoa(`${this.lbId}:${this.lbKey}`);
  }

  private get tokenKey(): string {
    return `T-${this.clientKey}`;
  }

  private get iv() {
    return CryptoJS.enc.Utf8.parse(btoa(`${this.clientId}:${this.clientKey}`));
  }

  private get jsonFormatter() {
    return {
      stringify: (cipherParams: any) => {
        const jsonObj: any = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) };
        if (cipherParams.iv) jsonObj.iv = cipherParams.iv.toString();
        if (cipherParams.salt) jsonObj.s = cipherParams.salt.toString();
        return JSON.stringify(jsonObj);
      },
      parse: (jsonStr: string) => {
        const jsonObj = JSON.parse(jsonStr);
        const cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
        });
        if (jsonObj.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv);
        if (jsonObj.s) cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s);
        return cipherParams;
      }
    };
  }

  private encrypt(value: any): any {
    value = typeof value === 'string' ? value : JSON.stringify(value);
    const _key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const encrypted = CryptoJS.AES.encrypt(value, _key, {
      format: this.jsonFormatter,
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  private decrypt(value: any): any {
    const _key = CryptoJS.enc.Utf8.parse(this.secretKey);
    const decrypted = CryptoJS.AES.decrypt(value, _key, {
      format: this.jsonFormatter,
      keySize: 128 / 8,
      iv: this.iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }

  setEncryptToken(value: any) {
    this.clearToken();
    sessionStorage.setItem(this.tokenKey, this.encrypt(value));
  }

  clearToken() {
    sessionStorage.removeItem(this.tokenKey);
  }

  getEncryptToken(): any {
    const result = sessionStorage.getItem(this.tokenKey);
    return result ? this.decrypt(result) : null;
  }

  clear() {
    this.clearToken();
  }

  setEncrypt(key: any, value: any) {
    this.clearEncrypt(key);
    sessionStorage.setItem(key, this.encrypt(value));
  }

  clearEncrypt(key: any) {
    sessionStorage.removeItem(key);
  }

  getEncrypt(key: any): any {
    const result = sessionStorage.getItem(key);
    return result ? this.decrypt(result) : null;
  }
}
