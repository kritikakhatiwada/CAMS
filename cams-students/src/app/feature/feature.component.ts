import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FeatureService } from './feature.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.css']
})
export class FeatureComponent {

  userData : any;
  dropdownVisible: boolean = false;


  constructor(
    private authService: AuthService,
    private router:Router,
    private featureService: FeatureService
  ) { }

  ngOnInit() {
    this.getUserName();
  } 


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUserName() {
    
      this.authService.getCurrentUser().subscribe((response: any) => {
        console.log(response);
        this.userData = response.user;
        this.featureService.setUserData(this.userData);

      });
    
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout() {
    this.authService.clearToken();
    this.router.navigate(['auth/login']);
  }

}
