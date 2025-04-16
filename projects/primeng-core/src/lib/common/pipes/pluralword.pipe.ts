import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralword'
})
export class PluralwordPipe implements PipeTransform {

  transform(value: any, tab: any[]): string {
    if (tab && tab.length <= 1) {
      return value;
    }

    const mots = value.split(' ').map((mot: any) => {

      if (mot.endsWith('al')) {
        return mot.substring(0, mot.lastIndexOf('al')) + 'aux';
      }

      if (mot.endsWith('eau') || mot.endsWith('au')) {
        return mot + 'x';
      }

      if (!mot.endsWith('s') && !mot.endsWith('x') && !mot.endsWith('z')) {
        return mot + 's';
      }

      return mot;

    }).join(' ');

    return mots;
  }

}
