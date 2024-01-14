import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/customers.service';

interface OrdersList {
  id: string;
  orders: {
    productName: string;
    itemCost: number;
  }[];
}
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersList: OrdersList[] = [];

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.customersService.getOrdersList().subscribe((ordersList: OrdersList[]) => {
      this.ordersList = ordersList;
    });
  }

  loadOrders(): void {
    this.customersService.getOrdersList().subscribe((ordersList) => {
      // Assuming the API returns an array of order lists
      this.ordersList = ordersList;
    });
  }
}