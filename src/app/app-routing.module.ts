import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component'
import { CustomersComponent } from './customers/customers.component'
import { CustomerComponent } from './customer/customer.component'
import { RoomsComponent } from './rooms/rooms.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { ReservationComponent } from './reservation/reservation.component'

const routes: Routes = [
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },
  { path: 'customers/:id', component: CustomerComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'reservations/new', component: NewReservationComponent },
  { path: 'reservations/:id', component: ReservationComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
