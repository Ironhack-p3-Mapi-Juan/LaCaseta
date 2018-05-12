import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ApplicationRef } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { routes } from "./routes";
import { AppComponent } from "./app.component";
import { SessionService } from "./services/session.service";
import { UserService } from "./services/user.service";
import { CalendarService } from "./services/calendar.service";
import { BookingService } from "./services/booking.service";
import { DogService } from "./services/dog.service";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./Componentes/home/home.component";
import { SignUpComponent } from "./Componentes/sign-up/sign-up.component";
import { LogInComponent } from "./Componentes/log-in/log-in.component";
import { NavBarComponent } from "./Componentes/nav-bar/nav-bar.component";
import { ProfileComponent } from "./Componentes/profile/profile.component";
import { ShowCalendarComponent } from "./Componentes/showCalendar/showCalendar.component";
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    ShowCalendarComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    NavBarComponent,
    ProfileComponent
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
