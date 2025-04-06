import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FeatureComponent } from "./feature.component";
import { HomeComponent } from "./home/home.component";
import { CollegeDetailComponent } from "./college-detail/college-detail.component";
import { SearchResultComponent } from "./search-result/search-result.component";
import { MyApplicationsComponent } from "./my-applications/my-applications.component";
import { IsStudentGuard } from "../auth/authguard/authguard.service";
import { StudentDetailComponent } from "./student-detail/student-detail.component";
import { StudentDetailModule } from "./student-detail/student-detail.module";
import { CollegesComponent } from "./colleges/colleges.component";
import { MyFavoritesComponent } from "./my-favorites/my-favorites.component";
import { PaymentComponent } from "./payment/payment.component";

const routes: Routes = [
    {
        path: '',
        component: FeatureComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'view-colleges',
                component: CollegesComponent
            },
            {
                path: 'college/:id',
                component: CollegeDetailComponent
            },
            {
                path: 'search',
                component: SearchResultComponent
            },
            {
                path: 'my-applications',
                canActivate: [IsStudentGuard],
                component: MyApplicationsComponent
        
            },
            {
                path: 'payment',
                canActivate: [IsStudentGuard],
                component: PaymentComponent
            },
            {
                path: 'my-favorites',
                canActivate: [IsStudentGuard],
                component: MyFavoritesComponent
            },
            {
                path: 'details',
                loadChildren: () => import("./student-detail/student-detail.module").then( m => StudentDetailModule)
            }
        ]
        
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FeaturesRoutingModule { };