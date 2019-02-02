import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Products } from './products';
import { Cats } from '../categories/cats';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = 'http://localhost/AngularPHPCrud/products/api/';
  baseCats = 'http://localhost/AngularPHPCrud/cats/api/';
prods: Products[];
catList: Cats[];

constructor(private http: HttpClient) { }

  getAll(): Observable<Products[]> {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res) => {
        this.prods = res['data'];
        return this.prods;
    }),
    catchError(this.handleError));
  }

  getAllCats(): Observable<Cats[]> {
    return this.http.get(`${this.baseCats}/list`).pipe(
      map((res) => {
        this.catList = res['data'];
        console.log(this.catList)
        return this.catList;
    }),
    catchError(this.handleError));
  }

  store(prods: Products): Observable<Products[]> {
    return this.http.post(`${this.baseUrl}/store`, { data: prods })
      .pipe(map((res) => {
        this.prods.push(res['data']);
        return this.prods;
      }),
      catchError(this.handleError));
  }

  update(prods: Products): Observable<Products[]> {
    return this.http.put(`${this.baseUrl}/update`, { data: prods })
      .pipe(map((res) => {

        console.log(JSON.stringify( this.prods))

        const theProds = this.prods.find((item) => {
          return +item['id'] === +prods['id'];
        });

       // alert(theProds);

        if (theProds) {
          theProds['prod_name'] = prods['prod_name'];
          theProds['prod_description'] = prods['prod_description'];
          theProds['prod_price'] = prods['prod_price'];
        }
        return this.prods;
      }),
      catchError(this.handleError));
  }

  delete(id: number): Observable<Products[]> {
    const params = new HttpParams()
      .set('id', id.toString());

    return this.http.delete(`${this.baseUrl}/delete`, { params: params })
      .pipe(map(res => {
        const filteredProducts = this.prods.filter((prods) => {
          return +prods['id'] !== +id;
        });
        return this.prods = filteredProducts;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);

    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }
}
