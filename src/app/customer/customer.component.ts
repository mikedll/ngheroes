import { FormBuilder } from '@angular/forms'
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
  
  customerForm = this.fb.group({
    firstName: [''],
    lastName: ['']
  })
  
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomer()    
  }

  onSave() {
    this.customer.firstName = this.customerForm.value.firstName
    this.customer.lastName = this.customerForm.value.lastName
    this.customerService.updateCustomer(this.customer)
      .subscribe(_ => {})
  }
  
  getCustomer() {
    const id = this.route.snapshot.paramMap.get('id')
    
    this.customerService.getCustomer(id)
      .subscribe((customer) => {
        this.customer = customer
        this.customerForm.patchValue({
          firstName: customer.firstName,
          lastName: customer.lastName
        })
      })    
  }
}
