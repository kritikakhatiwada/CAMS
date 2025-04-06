import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class MyApplicationsService {

  constructor(private http: HttpClient) { }

  getApplications() {
    return this.http.get(`${environment.base_url}applications/all`);
  }

  getApplicationById(id: number) {
    return this.http.get(`${environment.base_url}applications/single/${id}`);
  }
}
