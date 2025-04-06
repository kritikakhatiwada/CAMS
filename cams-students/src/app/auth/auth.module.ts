import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        AuthComponent,
        LoginComponent,
        RegisterComponent
    ],
    imports:[
        AuthRoutingModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [

    ],
    bootstrap:[AuthComponent]
})

export class AuthModule{}