
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Login } from './login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://localhost/AngularPHPCrud/login/api/';
  login: Login[];


constructor(private http: HttpClient) { }

  getDetails(): Observable<Login[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.login = res['data'];
        return this.login;
    }),
    catchError(this.handleError));
  }

  
  LoginAuth(login: Login): Observable<Login[]> {
    return this.http.post(`${this.baseUrl}/validate`, { data:login })
      .pipe(map((res) => {
        this.login = res['data'];
        var result = this.login;
       
        return this.login;
       
      }),
      catchError(this.handleError));
  }

  
  

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
