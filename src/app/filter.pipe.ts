import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(customers: any[], searchText: string): any[] {
    if (!customers || !searchText) {
      return customers;
    }

    searchText = searchText.toLowerCase();

    return customers.filter((customer) =>
      customer.firstName.toLowerCase().includes(searchText) ||
      customer.lastName.toLowerCase().includes(searchText) ||
      customer.address.toLowerCase().includes(searchText) ||
      customer.city.toLowerCase().includes(searchText) ||
      customer.state.name.toLowerCase().includes(searchText) ||
      customer.state.abbreviation.toLowerCase().includes(searchText)
    );
  }
}