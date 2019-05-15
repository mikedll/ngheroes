import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ReservationService } from '../reservation.service'
import { Reservation } from '../reservation'

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  reservation: Reservation
  
  constructor(private route: ActivatedRoute,
              private reservationService: ReservationService) { }

  ngOnInit() {
    this.getReservation()
  }

  getReservation() {
    const id = this.route.snapshot.paramMap.get('id')
    this.reservationService.getReservation(id)
      .subscribe(reservation => this.reservation = new Reservation().deserialize(reservation))
  }

}
