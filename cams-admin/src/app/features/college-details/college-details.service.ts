import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CollegeDetailsService {
  getCourseById(course_id: any) {
    let url = `${environment.base_url}college/detail/${course_id}`;
    return this.http.get(url);
  }

  constructor(private http: HttpClient) {}
  getCollegeDetails() {
    let url = `${environment.base_url}college/`;
    return this.http.get(url);
  }

  addCollege(data: any) {
    let url = `${environment.base_url}college/`;
    return this.http.post(url, data);
  }

  updateCollege(id: string, data: FormData) {
    console.log('Data:', data);

    return this.http.put(`${environment.base_url}college/update/${id}`, data);
  }

  getCollegeDetail(id: any) {
    let url = `${environment.base_url}college/detail/${id}`;
    return this.http.get(url);
  }

  getFaculties() {
    let url = 'assets/faculties.json';
    return this.http.get(url);
  }

  getAllUsers() {
    let url = `${environment.base_url}users/all-user`;
    return this.http.get(url);
  }

  deleteCollege(id: any) {
    let url = `${environment.base_url}college/delete/${id}`;
    return this.http.delete(url);
  }

  getUserByCode(code: any) {
    let url = `${environment.base_url}users/code/${code}`;
    return this.http.get(url);
  }
}
