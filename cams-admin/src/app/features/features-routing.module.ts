import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { CollegeDetailsComponent } from './college-details/college-details.component';
import { StaffsComponent } from './staffs/staffs.component';
import { ManagePaymentsComponent } from './manage-payments/applications.component';

const routes: Routes = [
    {
        path: '',
        component: FeaturesComponent,
        children: [
            {
                path: '',
                component: DashboardComponent
            },
            {
                path:'manage-payments',
                component:ManagePaymentsComponent
            },
            {
                path:'staffs',
                component:StaffsComponent
            },
            {
                path:'college-details',
                component:CollegeDetailsComponent
            }

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
