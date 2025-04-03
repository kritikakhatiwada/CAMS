import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagePaymentsService {
  constructor(private http: HttpClient) {}

  fetchPaymentsDetails() {
    let url = `${environment.base_url}payments/`;
    return this.http.get(url);
  }

  getUserById(id: any) {
    let url = `${environment.base_url}users/userInfo/${id}`
    return this.http.get(url);
  }
 
}
