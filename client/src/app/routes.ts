import { Routes } from "@angular/router";
import { SignUpComponent } from "./Componentes/sign-up/sign-up.component";
import { HomeComponent } from "./Componentes/home/home.component";
import { LogInComponent } from "./Componentes/log-in/log-in.component";
import { ProfileComponent } from "./Componentes/profile/profile.component";


export const routes: Routes = [
  { path: '', redirectTo:'signup', pathMatch:'full'},
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LogInComponent},
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent}
  
]