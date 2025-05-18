import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly jsonUrl = '../../../../assets/data/data.json';

  // Fetches the JSON data and extracts the password
  getPassword(): Observable<string> {
    return this.http.get<{ password: any }>(this.jsonUrl).pipe(map(data => data.password));
  }
}
