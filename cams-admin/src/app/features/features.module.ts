import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesRoutingModule } from './features-routing.module'; 
import { CollegeDetailsComponent } from './college-details/college-details.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { StaffsComponent } from './staffs/staffs.component';
import { ManagePaymentsComponent } from './manage-payments/applications.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
@NgModule({
  declarations: [
    FeaturesComponent,
    DashboardComponent, 
    CollegeDetailsComponent,
    StaffsComponent,
    ManagePaymentsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    NgSelectModule,  
    NgChartsModule
  ],
  providers: [],
  bootstrap: [FeaturesComponent]
})
export class FeaturesModule { }
