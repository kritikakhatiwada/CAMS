import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CollegeDetailService {

  constructor(private http: HttpClient) { }

  // Get the list of favorite colleges for a specific student
  getFavoriteColleges() {
    return this.http.get(`${environment.base_url}favorites/student`);
}


  // Post a new college to the favorites list
  postFavoriteColleges(data: any): Observable<any> {
    return this.http.post(`${environment.base_url}favorites/add`, data);
  }

  removeFavoriteColleges(college_id: any) {
    return this.http.delete(`${environment.base_url}favorites/remove/${college_id}`);
}

applyCollege(data: any) {
    let url = `${environment.base_url}applications/apply`
    return this.http.post(url, data);
  }

  getAppliedCourses() {
    return this.http.get(`${environment.base_url}applications/all`);
  }

  initPayment(id: number) {  
    const url = `${environment.base_url}payments/${id}`; 
    return this.http.get(url );
  }

  paymentLookup(pidx:string, orderId:string) {
    const url = `${environment.base_url}payments/bill-detail/${orderId}?pidx=${pidx}`;
    return this.http.get(url);
  }
}
