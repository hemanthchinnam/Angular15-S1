import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../../customers.service';
import { FilterPipe } from 'src/app/filter.pipe';
import { Router } from '@angular/router';
@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css'],
  providers: [FilterPipe],
})
export class CustomerlistComponent implements OnInit {
  customersData: any = [];
  pagedCustomers: any[] = [];
  pageSize: number = 5;
  currentPage: number = 1;
  searchText:string = '';
  constructor(
    private customers: CustomersService,
    private FilterPipe: FilterPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customers.getAllCustomers().subscribe((alldata) => {
      this.customersData = alldata;
      this.updatePageData();
    });
  }

  deleteCustomer(customer_id: any) {
    this.customers.deleteCustomer(customer_id).subscribe(() => {
      this.ngOnInit();
      const userConfirmed = window.confirm("Do you want to delete the customer?");

      if (userConfirmed) {
        alert("Customer deleted successfully!");
      } else {
        alert("Deletion canceled.");
      }
    });
  }
  viewOrders(orders: any): void {
    // Navigate to the order page with orders data
    this.router.navigate(['/orders/:id'], { state: { orders: orders } });
  }

  updatePageData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCustomers = this.customersData.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePageData();
  }

  getPaginationArray(): number[] {
    const totalPages = Math.ceil(this.customersData.length / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  getPaginatedCustomers(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const paginatedCustomers = this.customersData.slice(startIndex, endIndex);

    return this.FilterPipe.transform(paginatedCustomers, this.searchText);
  }
}
