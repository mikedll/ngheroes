
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Meta } from '@angular/platform-browser'
import { Observable, of } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customersUrl = 'api/customers';

  httpOptions: {}
  
  constructor(private http: HttpClient,
              private meta: Meta) {
    this.csrfToken = meta.getTag('name="csrf-token"').content
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'CSRF-Token': this.csrfToken
      })
    };    
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.customersUrl, customer, this.httpOptions).pipe(
      tap((newCustomer: Customer) => this.log(`added customer w/ id=${}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customersUrl)
      .pipe(
        tap(_ => this.log('fetched customers')),
        catchError(this.handleError<Customer[]>('getCustomers', [])))
  }

  private handleError<T>(operation='operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error)

      this.log(`${operation} failed ${error.message}`)

      return of(result as T)
    }
  }
  
  private log(message: string) {
    this.messageService.add(`CustomerService: ${message}`)
  }
}
