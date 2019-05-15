import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms'
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
    'room': ['', Validators.required],
    'startAt': ['', Validators.required],
    'endAt': ['', Validators.required],
    'customer': ['', Validators.required]
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
    return this.customer ? this.customer.displayName() : ''
  }
  
  getInitData() {
    const cid = this.route.snapshot.queryParamMap.get('cid')
    this.customerService.getCustomer(cid)
      .subscribe(customerJson => {
        this.customer = new Customer().deserialize(customerJson)
        this.reservationForm.patchValue({
          customer: this.customer._id
        })
      })

    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms)    
  }

}
