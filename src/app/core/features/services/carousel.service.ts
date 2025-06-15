import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environments';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  constructor(private http: HttpClient) { }

  addCarousel(model: any | FormData): Observable<void> {
    return this.http.post<void>(environment.CarouselApi, model)
  }

  getAllCarousel(): Observable<any[]> {
    return this.http.get<any[]>(environment.CarouselApi);
  }

  getCompanyCarousel(companyID: number): Observable<any[]> {
    return this.getAllCarousel().pipe(
      map(carousel => carousel.filter(a => a.companyID === companyID))
    );
  }

  getCarousel(id: string): Observable<any> {
    return this.http.get<any>(`${environment.CarouselApi}/GetCarouselById?id=${id}`);
  }

  updateCarousel(id: string, updateCarouselRequest: any | FormData): Observable<any> {
    return this.http.put<any>(`${environment.CarouselApi}/EditCarousel/${id}`, updateCarouselRequest);
  }

  deleteCarousel(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.CarouselApi}/DeleteCarousel?id=${id}`);
  }
}
