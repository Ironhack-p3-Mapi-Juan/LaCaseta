import { Routes } from "@angular/router";
import { SignUpComponent } from "./Componentes/sign-up/sign-up.component";
import { HomeComponent } from "./Componentes/home/home.component";
import { ShowCalendarComponent } from "./Componentes/showCalendar/showCalendar.component";
import { LogInComponent } from "./Componentes/log-in/log-in.component";
import { ProfileComponent } from "./Componentes/profile/profile.component";
import { EditUserComponent } from "./Componentes/edit-user/edit-user.component";


export const routes: Routes = [
  
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LogInComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'calendar', component: ShowCalendarComponent},
  { path: 'edit', component: EditUserComponent},
  { path: '**', redirectTo:'', pathMatch:'full'}
  
]