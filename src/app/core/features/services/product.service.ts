import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(model: any | FormData): Observable<void> {
    return this.http.post<void>(environment.ProductApi, model)
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(environment.ProductApi);
  }

  getCompanyProducts(companyID: number): Observable<any[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(product => product.companyID === companyID))
    );
  }

  getProduct(id: string): Observable<any> {
    return this.http.get<any>(`${environment.ProductApi}/GetProductById?id=${id}`);
  }

  updateProduct(id: string, updateProductRequest: any | FormData): Observable<any> {
    return this.http.put<any>(`${environment.ProductApi}/EditProduct/${id}`, updateProductRequest);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.ProductApi}/DeleteProduct?id=${id}`);
  }
}
