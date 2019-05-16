
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Reservation } from './reservation'
import { MessageService } from './message.service'
import { QueryResult } from './queryResult'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationsUrl = 'api/reservations'
  
  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.reservationsUrl, reservation).pipe(
      tap((newReservation: Reservation) => this.log(`added reservation w/ id=${newReservation._id}`)),
      catchError(this.handleError<Reservation>('addReservation'))
    );
  }

  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.reservationsUrl + '/' + id)
      .pipe(
        tap((reservation: Reservation) => this.log(`fetched reservation having id=${reservation._id}`)),
        catchError(this.handleError<Reservation>('getReservation')))
  }

  getReservations(): Observable<QueryResult<Reservation>> {
    return this.http.get<QueryResult<Reservation>>(this.reservationsUrl)
      .pipe(
        tap((reservations: QueryResult<Reservation>) => this.log(`fetched ${reservations.results.length} reservation(s)`)),
        catchError(this.handleError<QueryResult<Reservation>>('getReservations', new QueryResult())))
  }
        
  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error)

      this.log(`${operation} failed ${error.message}`)

      return of(result as T)
    }
  }
  
  private log(message: string) {
    this.messageService.add(`ReservationService: ${message}`)
  }
  
}
