import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplicationsComponent } from './applications/applications.component';
import { StudentsComponent } from './students/students.component';
import { CollegeDetailsComponent } from './college-details/college-details.component';

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
                path:'applications',
                component:ApplicationsComponent
            },
            {
                path:'students',
                component:StudentsComponent
            },
            {
                path:'college-details',
                loadChildren: () => import('./college-details/college-details.module').then(m => m.CollegeDetailsModule)
            }

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
