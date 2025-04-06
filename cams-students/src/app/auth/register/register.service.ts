import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http:HttpClient
  ) { }
  submitRegister(data:any){
    let url =`${environment.base_url}users/register`
    return this.http.post(url,data)
  }

}
