import { Component, Input, OnInit } from '@angular/core';
import { CustomersService } from '../../../customers.service';

@Component({
  selector: 'app-customercard',
  templateUrl: './customercard.component.html',
  styleUrls: ['./customercard.component.css'],
})
export class CustomercardComponent implements OnInit {
  viewOrders: any;
  customersData: any = [];
  pagedCustomers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  pages: number[] = [];
  
  

  constructor(private customers: CustomersService) {}

  ngOnInit(): void {
    this.customers.getAllCustomers().subscribe((alldata) => {
      console.log(alldata);
      this.customersData = alldata;
      this.updatePageData();
    });
  }

  deleteCustomer(customer_id:any){
    console.log(customer_id);
    this.customers.deleteCustomer(customer_id).subscribe((result)=>{
      // console.log(result);
      this.ngOnInit();
      
      const userConfirmed = window.confirm("Do you want to delete the customer?");
  
      if (userConfirmed) {
        alert("Customer deleted successfully!");
        // Perform the delete operation or call the deleteCustomer function here
      } else {
        alert("Deletion canceled.");
      }
    
    });

  }

  updatePageData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedCustomers = this.customersData.slice(startIndex, endIndex);

    this.totalPages = Math.ceil(this.customersData.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageData();
    }
  }
  
}
