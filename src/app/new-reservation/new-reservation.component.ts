import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, Validators } from '@angular/forms'
import { CustomerService } from '../customer.service'
import { RoomService } from '../room.service'
import { ReservationService } from '../reservation.service'
import { Reservation } from '../reservation'
import { Customer } from '../customer'
import { Room } from '../room'


declare let $: any;

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
              private roomService: RoomService,
              private reservationService: ReservationService,
              private router: Router) { }

  ngOnInit() {
    this.getInitData()
    const $this = this
    $('input[formcontrolname=startAt], input[formcontrolname=endAt]').datepicker({
      onSelect: function(dateText) {
        $this.reservationForm.patchValue({
          [$(this).attr('formControlName')]: dateText
        })
      },
      dateFormat: 'yy-mm-dd'
    })
  }

  onSave() {
    const reservation = new Reservation().deserialize(this.reservationForm.value)
    this.reservationService.addReservation(reservation)
      .subscribe(reservation => this.router.navigate(['/reservations', reservation._id]))
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
      .subscribe(rooms => {
        this.rooms = rooms

        if(this.rooms.length > 0) {
          this.reservationForm.patchValue({
            room: this.rooms[0]._id
          })
        }
      })    
  }

}
