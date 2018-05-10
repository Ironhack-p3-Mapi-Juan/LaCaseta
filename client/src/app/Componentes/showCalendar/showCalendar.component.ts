import { Component, OnInit } from "@angular/core";
import { CalendarService } from "../../services/calendar.service";

@Component({
  selector: "app-showCalendar",
  templateUrl: "./showCalendar.component.html",
  styleUrls: ["./showCalendar.component.css"]
})
export class ShowCalendarComponent implements OnInit {
  calendar: any;

  constructor(public calendarService: CalendarService) {}

  ngOnInit() {
    
  }
}
