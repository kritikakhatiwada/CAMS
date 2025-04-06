import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentGuardService } from '../student-guard/student-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formStructure:FormGroup

  constructor(
    private fb:FormBuilder,
    private loginService:LoginService,
    private authService:AuthService,
    private StudentGuard: StudentGuardService,
    private router:Router
  )
    {
        this.formStructure=this.fb.group({
          email:['',Validators.required],
          password:['',Validators.required]
        })
       
  }

  onSubmit() {
    if (this.formStructure.valid) {
      this.loginService.submitLogin(this.formStructure.value).subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          if(res.userRoles.includes('STUDENT')){
            this.authService.setAccessToken(res.token);
            this.router.navigate(['']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Access Denied',
              text: 'You are not authorized to access this page.',
            });
          }
          
        
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.message,
          });
        }
      });
    }
  }
  

}
