import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms'; 
import { CustomersService } from 'src/customers.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit{
gender: any;
  constructor(private customer: CustomersService){}
  addCustomer=new FormGroup({
    firstName:new FormControl( '' ),
    lastName:new FormControl( '' ),
    gender: new FormControl( '' ),
    address:new FormControl( '' ),
    city:new FormControl( '' ),
    stateName: new FormControl( '' ),
    
    
});
message:boolean=false;
  ngOnInit(): void {

    
  }
SaveData(){

// console.log(this.addCustomer.value)
this.customer.saveCustomerData( this.addCustomer.value).subscribe((result)=>{
  // console.log(result);
  this.message=true;
  this.addCustomer.reset({});
});
}
}
