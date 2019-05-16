import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component'
import { CustomerComponent } from './customer/customer.component'
import { RoomsComponent } from './rooms/rooms.component'
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { ReservationComponent } from './reservation/reservation.component'
import { ReservationsComponent } from './reservations/reservations.component'

const routes: Routes = [
  { path: 'customers/:id', component: CustomerComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'reservations/new', component: NewReservationComponent },
  { path: 'reservations/:id', component: ReservationComponent },
  { path: 'reservations', component: ReservationsComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
