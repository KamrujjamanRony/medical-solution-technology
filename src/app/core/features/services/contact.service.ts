import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  getAllContact(): Observable<any[]> {
    return this.http.get<any[]>(environment.ContactApi);
  }

  getContact(id: string): Observable<any> {
    return this.http.get<any>(`${environment.ContactApi}/GetAddressById?id=${id}`);
  }

  updateContact(id: string, updateAddressRequest: any | FormData): Observable<any> {
    return this.http.put<any>(`${environment.ContactApi}/EditAddress/${id}`, updateAddressRequest);
  }
}
