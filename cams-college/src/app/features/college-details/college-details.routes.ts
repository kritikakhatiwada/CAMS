import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollegeDetailsComponent } from './college-details.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';


const routes: Routes = [
    {
        path: '',
        component: CollegeDetailsComponent,
        children: [
            {
                path: '',
                component: ViewComponent
            },
            {
                path: 'add',
                component: AddComponent
            }
            

        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeDetailsRoutingModule { }
