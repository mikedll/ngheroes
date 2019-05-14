import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'
import { Room } from './room'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private roomsUrl = 'api/rooms';

  private httpOptions: {}
  
  constructor(private http: HttpClient,
              private messageService: MessageService) {
    
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }

  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.roomsUrl, room, this.httpOptions).pipe(
      tap((newRoom: Room) => this.log(`added room w/ id=${room._id}`)),
      catchError(this.handleError<Room>('addRoom'))
    );
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl)
      .pipe(
        tap(_ => this.log('fetched rooms')),
        catchError(this.handleError<Room[]>('getRooms', [])))
  }

  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error)

      this.log(`${operation} failed ${error.message}`)

      return of(result as T)
    }
  }
  
  private log(message: string) {
    this.messageService.add(`RoomService: ${message}`)
  }
  
}
