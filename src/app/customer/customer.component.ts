import { FormControl } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CustomerService } from '../customer.service'
import { Customer } from '../customer'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer: Customer
  
  firstName = new FormControl('')
  
  constructor(private route: ActivatedRoute,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomer()    
  }

  getCustomer() {
    const id = this.route.snapshot.paramMap.get('id')
    
    this.customerService.getCustomer(id)
      .subscribe((customer) => this.customer = customer)    
  }
}
