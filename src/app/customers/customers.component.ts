
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Customer } from '../customer'
import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  private customers: Customer[] = []

  firstName = new FormControl('');
  lastName = new FormControl('');

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers()
  }

  addCustomer() {
    const customer = new Customer()
    customer.firstName = this.firstName.value
    customer.lastName = this.lastName.value
    
    this.customerService.addCustomer(customer)
      .subscribe((customer) => {
        this.firstName.setValue('')
        this.lastName.setValue('')        
        this.customers.push(customer)
      })
  }
  
  getCustomers() {
    this.customerService.getCustomers().subscribe(
      (customers) => this.customers = customers)
  }
}
