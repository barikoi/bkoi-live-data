import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usage } from '../model/Usage';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${environment.BKOI_TOKEN}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class ReverseGeoService {
  constructor(private http: HttpClient) {}

  // Get Usage
  getUsage(): Observable<Usage[]> {
    return this.http.get<Usage[]>(`https://barikoi.xyz/v1/business/api/daily/usage`, httpOptions);
  }
  // getUsage(): any {
  //    this.http.get('https://barikoi.xyz/v1/business/api/daily/usage', httpOptions).subscribe(data => {
  //     console.log(data);
  //   });
  // }

  golddigeer(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
      console.log(data);
    });
  }
}
