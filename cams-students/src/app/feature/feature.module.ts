import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './feature.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FeatureComponent } from './feature.component';
import { CollegesComponent } from './colleges/colleges.component';
import { CollegeDetailComponent } from './college-detail/college-detail.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { MyFavoritesComponent } from './my-favorites/my-favorites.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { TimeagoPipe } from 'ngx-timeago';
import { PaymentComponent } from './payment/payment.component';



@NgModule({
  declarations: [
    HomeComponent,
    FeatureComponent,
    CollegesComponent,
    CollegeDetailComponent,
    SearchResultComponent,
    MyApplicationsComponent,
    MyFavoritesComponent,
    RecommendedComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class FeatureModule { }
