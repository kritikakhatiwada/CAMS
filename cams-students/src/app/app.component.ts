import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StudentCAMS';

  constructor() {
    this.getUserLocation()
  }


  getUserLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            // Handle specific errors
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error('User denied the request for Geolocation.'));
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error('Location information is unavailable.'));
                break;
              case error.TIMEOUT:
                reject(new Error('The request to get user location timed out.'));
                break;
              default:
                reject(new Error('An unknown error occurred.'));
                break;
            }
          },
          {
            timeout: 10000, // 10 seconds timeout
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }
  
  

  saveLocationToSession(location: { latitude: number; longitude: number }): void {
    sessionStorage.setItem('userLocation', JSON.stringify(location));
  }

  getLocationFromSession(): { latitude: number; longitude: number } | null {
    const location = sessionStorage.getItem('userLocation');
    console.log(location);
    
    return location ? JSON.parse(location) : null;
  }
}
