import { Routes } from "@angular/router";
import { SignUpComponent } from "./Componentes/sign-up/sign-up.component";
import { HomeComponent } from "./Componentes/home/home.component";
import { ShowCalendarComponent } from "./Componentes/showCalendar/showCalendar.component";
import { LogInComponent } from "./Componentes/log-in/log-in.component";
import { ProfileComponent } from "./Componentes/profile/profile.component";
import { EditUserComponent } from "./Componentes/edit-user/edit-user.component";
import { BookListComponent } from "./Componentes/bookList/bookList.component";
import { MyDogsComponent } from "./Componentes/my-dogs/my-dogs.component";
import { NewDogComponent } from "./Componentes/new-dog/new-dog.component";


export const routes: Routes = [
  
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'login', component: LogInComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'calendar', component: ShowCalendarComponent},
  { path: 'edit', component: EditUserComponent},
  { path: 'booking', component: BookListComponent},
  { path: 'dogs', component: MyDogsComponent},
  { path: 'newDogs', component: NewDogComponent},
  { path: '**', redirectTo:'', pathMatch:'full'}
  
]