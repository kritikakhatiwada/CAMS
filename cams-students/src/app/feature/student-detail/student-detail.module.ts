import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDetailsRoutingModule } from './student-detail.routes';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { StudentDetailComponent } from './student-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddComponent,
    ViewComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StudentDetailsRoutingModule
  ]
})
export class StudentDetailModule { }
