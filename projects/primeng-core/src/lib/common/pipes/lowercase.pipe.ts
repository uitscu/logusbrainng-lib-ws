import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'lowercase'
})
export class LowercasePipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        return value.toString().trim().toLowerCase();
    }
}
