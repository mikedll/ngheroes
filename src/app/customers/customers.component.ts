
import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer'
import { CustomerService } from '../customer.service'

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  private customers: Customer[] = []

  firstName: string
  lastName: string
  
  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers()
  }

  addCustomer() {
    const customer = new Customer()
    customer.firstName = this.firstName
    customer.lastName = this.lastName
    
    this.customerService.addCustomer(customer)
      .subscribe((customer) => this.customers.push(customer))
  }
  
  getCustomers() {
    this.customerService.getCustomers().subscribe(
      (customers) => this.customers = customers)
  }
}
