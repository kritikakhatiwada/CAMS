import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { StudentDetailComponent } from './student-detail.component';


const routes: Routes = [
    {
        path: '',
        component: StudentDetailComponent,
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
export class StudentDetailsRoutingModule { }
