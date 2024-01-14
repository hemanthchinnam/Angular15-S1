import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  customersData: any[] = []; // Define your data structure
  selectedCustomerOrders: any[] = [];
  loadOrders(customer: any) {
    // Implement logic to load orders for the selected customer
    this.selectedCustomerOrders = customer.orders;
  }
}
