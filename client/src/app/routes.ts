import { Routes } from "@angular/router";
import { SignUpComponent } from "./Componentes/sign-up/sign-up.component";
import { HomeComponent } from "./Componentes/home/home.component";
import { ShowCalendarComponent } from "./Componentes/showCalendar/showCalendar.component";


export const routes: Routes = [
  { path: '', redirectTo:'login', pathMatch:'full'},
  { path: 'signup', component: SignUpComponent},
  //{ path: 'login', component: AuthLoginComponent},
  { path: 'home', component: HomeComponent},
  { path: 'calendar', component: ShowCalendarComponent}
  
]