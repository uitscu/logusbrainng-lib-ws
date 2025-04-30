import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluralwordPipe } from '../common/pipes/pluralword.pipe';
import { CurrencySpacePipe } from '../common/pipes/currency-space.pipe';
import { LowercasePipe } from '../common/pipes/lowercase.pipe';
import { SharedPreferences } from '../common/shared';



@NgModule({
  declarations: [
    PluralwordPipe,
    CurrencySpacePipe,
    LowercasePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PluralwordPipe,
    CurrencySpacePipe,
    LowercasePipe
  ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA
    ],
  providers: [
    PluralwordPipe,
    CurrencySpacePipe,
    LowercasePipe,
    SharedPreferences,
  ]
})
export class LbCommonModule { }
