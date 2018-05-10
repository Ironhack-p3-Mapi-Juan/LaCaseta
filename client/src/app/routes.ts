import { Routes } from "@angular/router";
import { SignUpComponent } from "./Componentes/sign-up/sign-up.component";
import { HomeComponent } from "./Componentes/home/home.component";


export const routes: Routes = [
  { path: '', redirectTo:'signup', pathMatch:'full'},
  { path: 'signup', component: SignUpComponent},
  //{ path: 'login', component: AuthLoginComponent},
  { path: 'home', component: HomeComponent},
  
]