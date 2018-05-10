import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CalendarService } from './services/calendar.service';
import { BookingService } from './services/booking.service';
import { ShowCalendarComponent } from './Componentes/showCalendar/showCalendar.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowCalendarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CalendarService, BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
