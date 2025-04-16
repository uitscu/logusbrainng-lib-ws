import { Injectable } from '@angular/core';
import { CipherConfig } from 'projects/primeng-core/src/lib/partials/models';

@Injectable({
  providedIn: 'root'
})
export class CipherConfigService {
  private config!: CipherConfig;

  setConfig(config: CipherConfig) {
    this.config = config;
  }

  getConfig(): CipherConfig {
    return this.config;
  }
}
