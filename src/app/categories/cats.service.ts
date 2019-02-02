import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Cats } from './cats';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  baseUrl = 'http://localhost/AngularPHPCrud/cats/api/';
  cats: Cats[];

constructor(private http: HttpClient) { }

  getAll(): Observable<Cats[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.cats = res['data'];
        return this.cats;
    }),
    catchError(this.handleError));
  }

  store(cats: Cats): Observable<Cats[]> {
    return this.http.post(`${this.baseUrl}store`, { data: cats })
      .pipe(map((res) => {
        this.cats.push(res['data']);
        return this.cats;
      }),
      catchError(this.handleError));
  }

  update(cats: Cats): Observable<Cats[]> {
    return this.http.put(`${this.baseUrl}/update`, { data: cats })
      .pipe(map((res) => {
        const theCats = this.cats.find((item) => {
          return +item['id'] === +cats['id'];
        });
        if (theCats) {
            theCats['price'] = +cats['price'];
            theCats['model'] = cats['model'];
        }
        return this.cats;
      }),
      catchError(this.handleError));
  }

  delete(id: number): Observable<Cats[]> {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/delete`, { params: params })
      .pipe(map(res => {
        const filteredCats = this.cats.filter((cats) => {
          return +cats['id'] !== +id;
        });
        return this.cats = filteredCats;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
