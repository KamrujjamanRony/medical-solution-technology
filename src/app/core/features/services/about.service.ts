import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient) { }


  getAllAbout(): Observable<any[]> {
    return this.http.get<any[]>(environment.AboutApi);
  }

  getAbout(id: string): Observable<any> {
    return this.http.get<any>(`${environment.AboutApi}/GetAboutUsById?id=${id}`);
  }

  updateAbout(id: string, updateAboutRequest: any | FormData): Observable<any> {
    return this.http.put<any>(`${environment.AboutApi}/EditAboutUs/${id}`, updateAboutRequest);
  }
}
