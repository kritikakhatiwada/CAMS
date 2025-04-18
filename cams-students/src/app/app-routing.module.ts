import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature/feature.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/feature.module').then(m => m.FeatureModule)
  },
  {
    path: "auth",
    loadChildren: () => 
      import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
