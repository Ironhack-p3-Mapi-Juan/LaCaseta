import { Component, OnInit } from "@angular/core";
import { CalendarService } from "../../services/calendar.service";
import * as moment from "moment";
import "moment/locale/es";

@Component({
  selector: "app-showCalendar",
  templateUrl: "./showCalendar.component.html",
  styleUrls: ["./showCalendar.component.css"]
})
export class ShowCalendarComponent implements OnInit {
  calendar: Array<any>;
  monthDays: number;
  firstDayMonth: number;
  firstDaySecondWeek: number;
  firstDayThirdWeek: number;
  firstDayFourthWeek: number;
  firstDayFifthWeek: number;
  firstDaySixthWeek: number;
  date: any;
  monthName: string;
  year: string;

  constructor(public calendarService: CalendarService) {}

  ngOnInit() {
    this.date = moment();
    this.createCalendar();
  }

  drawCalendar() {
    this.createCalendar();
    this.addBookings();
  }

  addBookings() {

  }

  createCalendar() {
    this.monthName = moment(this.date).format("MMMM");
    this.year = moment(this.date).format("YYYY");
    this.monthDays = moment(this.date)
      .endOf("month")
      .date();
    this.calendar = new Array(this.monthDays);
    this.firstDayMonth = moment(this.date)
      .startOf("month")
      .weekday();

    // First week
    this.calendar[0] = [];
    let day = 1;
    for (let i = 0; i < 7; i++) {
      if (i < this.firstDayMonth) {
        this.calendar[0].push(" ");
      } else {
        this.calendar[0].push(day);
        day++;
      }
    }

    this.firstDaySecondWeek = this.calendar[0][6] + 1;
    // Second week
    this.calendar[1] = [];
    for (let i = 0; i < 7; i++) {
      this.calendar[1].push(this.firstDaySecondWeek + i);
    }

    this.firstDayThirdWeek = this.calendar[1][6] + 1;
    if (this.firstDayThirdWeek < this.monthDays) {
      this.calendar[2] = [];
      for (let i = 0; i < 7; i++) {
        this.calendar[2].push(this.firstDayThirdWeek + i);
      }
    }

    this.firstDayFourthWeek = this.calendar[2][6] + 1;
    if (this.firstDayFourthWeek < this.monthDays) {
      this.calendar[3] = [];
      for (let i = 0; i < 7; i++) {
        this.calendar[3].push(this.firstDayFourthWeek + i);
      }
    }

    this.firstDayFifthWeek = this.calendar[3][6] + 1;
    if (this.firstDayFifthWeek < this.monthDays) {
      this.calendar[4] = [];
      for (let i = 0; i < 7; i++) {
        if (this.firstDayFifthWeek + i <= this.monthDays) {
          this.calendar[4].push(this.firstDayFifthWeek + i);
        }
      }
    }

    this.firstDaySixthWeek = this.calendar[4][6] + 1;
    if (this.firstDaySixthWeek < this.monthDays) {
      this.calendar[5] = [];
      for (let i = 0; i < 7; i++) {
        if (this.firstDaySixthWeek + i <= this.monthDays) {
          this.calendar[5].push(this.firstDaySixthWeek + i);
        }
      }
    }
  }

  previousMonth() {
    this.date.subtract(1, "month");
    this.drawCalendar();
  }

  nextMonth() {
    this.date.add(1, "month");
    this.drawCalendar();
  }

  setToday() {
    this.date = moment();
    this.drawCalendar();
  }
}