import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'currencySpace'
})
export class CurrencySpacePipe implements PipeTransform {

    transform(value: any, args?: any[]): any {
        return value.substring(0, 3) + '\u0020' + value.substring(3);
    }
}
