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
    FileSelectDirective

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAO4pN5ZBXS8kShPqE1Xf3c9_P9rS28pNw'
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
