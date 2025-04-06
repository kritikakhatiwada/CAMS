import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
@Injectable({
  providedIn: 'root'
})
export class RecommendedService {

  constructor(private http: HttpClient) { }

  // fetchRecommendedColleges() {
  //   let url = `${environment.base_url}recommendation/`
  //   return this.http.get(url);
  // }


  fetchRecommendedColleges() {
    let url = `${environment.base_url}recommendation/weighted`
    return this.http.get(url);
  }


}
