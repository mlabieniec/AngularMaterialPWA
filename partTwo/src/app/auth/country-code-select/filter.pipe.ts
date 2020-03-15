import { Pipe, PipeTransform } from '@angular/core';
import { CountryCode } from './country-codes';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: CountryCode[], searchText: string): CountryCode[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( code => {
      return code.name.toLowerCase().includes(searchText);
    });
   }
}