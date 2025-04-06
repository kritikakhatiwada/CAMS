import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { StudentGuardService } from '../student-guard/student-guard.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  student: any
  constructor(
    private http :HttpClient,
  ) {
   }

   submitLogin(data:any){
    let url=`${environment.base_url}users/login`
    return this.http.post(url,data)
   }
}

