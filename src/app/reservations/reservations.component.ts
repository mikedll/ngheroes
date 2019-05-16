import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service'

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  reservations: Reservation[] = []
  
  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.getReservations()
  }

  getReservations() {
    this.reservationService.getReservations()
      .subscribe(reservations => this.reservations = reservations.results.map((r) => new Reservation().deserialize(r)))
  }

}
