import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CollegeDetailService {
  private collegeIdSource = new BehaviorSubject<number | null>(null);
  collegeId$ = this.collegeIdSource.asObservable();

  constructor(private http: HttpClient) {}

  fetchOwnCollege() {
    let url = `${environment.base_url}college/own`;
    return this.http.get(url);
  }

  setCollegeId(collegeId: number) {
    this.collegeIdSource.next(collegeId);
  }

  updateCollegeDetails(data: any, id: any) {
    let url = `${environment.base_url}college/update/${id}`;
    return this.http.put(url, data);
  }
}
