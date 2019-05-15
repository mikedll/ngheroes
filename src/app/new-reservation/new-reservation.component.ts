import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { CustomerService } from '../customer.service'
import { RoomService } from '../room.service'
import { Customer } from '../customer'
import { Room } from '../room'


@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {

  rooms: Room[]
  customer: Customer

  reservationForm = this.fb.group({
    'room': [''],
    'startAt': [''],
    'endAt': [''],
    'customer': ['']
  })
  
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private roomService: RoomService) { }

  ngOnInit() {
    this.getInitData()
  }

  onSave() {
    console.log(this.reservationForm.value)
  }
  
  displayName() {
    console.log(typeof(this.customer))
    console.log(typeof(this.customer.displayName))
    return this.customer ? this.customer.displayName() : ''
  }
  
  getInitData() {
    const cid = this.route.snapshot.queryParamMap.get('cid')
    this.customerService.getCustomer(cid)
      .subscribe(customerJson => this.customer = new Customer().deserialize(customerJson))

    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms)    
  }

}
