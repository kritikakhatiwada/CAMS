import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentDetailService {

  constructor(private http: HttpClient) { }

  saveStudentDetailWithEducation(data: any) {
    return this.http.post(`${environment.base_url}students/add`, data)
  }

  getStudentDetailWithEducation(id:any) {
    return this.http.get(`${environment.base_url}students/single/${id}`)
  }

  getStudentDetailWithEducations() {
    return this.http.get(`${environment.base_url}students/own`)
  }


  updateStudentDetailWithEducation(id: any, data: any) {
    return this.http.put(`${environment.base_url}students/update/${id}`, data)
  }




}
