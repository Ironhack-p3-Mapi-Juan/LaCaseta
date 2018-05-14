import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routes } from './routes'

import { AppComponent } from './app.component';
import { CalendarService } from './services/calendar.service';
import { BookingService } from './services/booking.service';
import { ShowCalendarComponent } from './Componentes/showCalendar/showCalendar.component';
import { UserService } from './services/user.service';
import { DogService } from './services/dog.service';
import { HomeComponent } from './Componentes/home/home.component';
import { SignUpComponent } from './Componentes/sign-up/sign-up.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { SessionService } from './services/session.service';
import { LogInComponent } from './Componentes/log-in/log-in.component';
import { NavBarComponent } from './Componentes/nav-bar/nav-bar.component';
import { ProfileComponent } from './Componentes/profile/profile.component';
import { EditUserComponent } from './Componentes/edit-user/edit-user.component';
import { FileSelectDirective } from "ng2-file-upload";
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { BookListComponent } from './Componentes/bookList/bookList.component';
import { environment } from '../environments/environment';
import { BuddyBookingsPipe } from './pipes/buddyBookings.pipe';
import { MyDogsComponent } from './Componentes/my-dogs/my-dogs.component';
import { NewDogComponent } from './Componentes/new-dog/new-dog.component';
import { PublicBudyComponent } from './Componentes/public-budy/public-budy.component';
import { EditDogComponent } from './Componentes/edit-dog/edit-dog.component';



@NgModule({
  declarations: [
    AppComponent,
    ShowCalendarComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    NavBarComponent,
    ProfileComponent,
    EditUserComponent,
    BookListComponent,
    FileSelectDirective,
    BuddyBookingsPipe,
    MyDogsComponent,
    NewDogComponent,
    PublicBudyComponent,
    EditDogComponent

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.APIKEY
    })
  ],
  providers: [
    SessionService,
    CalendarService,
    BookingService,
    UserService,
    DogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
