import { Component, OnInit } from "@angular/core";
import { CalendarService } from "../../services/calendar.service";
import * as moment from "moment";
import "moment/locale/es";
import { BookingService } from "../../services/booking.service";
import { SessionService } from "../../services/session.service";

@Component({
  selector: "app-showCalendar",
  templateUrl: "./showCalendar.component.html",
  styleUrls: ["./showCalendar.component.css"]
})
export class ShowCalendarComponent implements OnInit {
  calendar: Array<Array<any>>;
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

  constructor(
    public calendarService: CalendarService,
    public bookingService: BookingService,
    public sessionService: SessionService
  ) {
    this.date = moment();
    this.drawCalendar();
  }

  ngOnInit() {}

  drawCalendar() {
    this.bookingService.getBuddyBookings().subscribe(
      data => {
        this.createCalendar();
        this.updateCalendar(data);
      },
      error => console.log(error)
    );
  }

  updateCalendar(bookings) {
    for (let i = 0; i < (this.calendar ? this.calendar.length : 0); i++) {
      for (let j = 0; j < (this.calendar[i] ? this.calendar[i].length : 0); j++) {
        bookings.forEach(e => {
          if (
            this.calendar[i][j].day >= parseInt(moment(e.start).format("D")) &&
            this.calendar[i][j].day <= parseInt(moment(e.end).format("D")) &&
            this.calendar[i][j].month >=
              parseInt(moment(e.start).format("M")) &&
            this.calendar[i][j].month <= parseInt(moment(e.end).format("M")) &&
            this.calendar[i][j].year >=
              parseInt(moment(e.start).format("YYYY")) &&
            this.calendar[i][j].year <= parseInt(moment(e.end).format("YYYY"))
          ) {
            this.calendar[i][j].idBook = e._id;
            this.calendar[i][j].status = e.status;
          }
        });
      }
    }
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
        this.calendar[0].push({
          day: day,
          month: moment(this.date).format("M"),
          year: moment(this.date).format("YYYY"),
          idBook: ""
        });
        day++;
      }
    }

    // add weeks
    for(let i = 1; i <= 5; i++) {
      this.addWeek(i);
    }

    /* this.firstDaySecondWeek = this.calendar[0][6].day + 1;
    // Second week
    this.calendar[1] = [];
    for (let i = 0; i < 7; i++) {
      this.calendar[1].push({
        day: this.firstDaySecondWeek + i,
        month: moment(this.date).format("M"),
        year: moment(this.date).format("YYYY"),
        idBook: ""
      });
    }

    // addWeek(position)

    this.firstDayThirdWeek = this.calendar[1][6].day + 1;
    if (this.firstDayThirdWeek <= this.monthDays) {
      this.calendar[2] = [];
      for (let i = 0; i < 7; i++) {
        this.calendar[2].push({
          day: this.firstDayThirdWeek + i,
          month: moment(this.date).format("M"),
          year: moment(this.date).format("YYYY"),
          idBook: ""
        });
      }
    }

    this.firstDayFourthWeek = this.calendar[2][6].day + 1;
    if (this.firstDayFourthWeek <= this.monthDays) {
      this.calendar[3] = [];
      for (let i = 0; i < 7; i++) {
        this.calendar[3].push({
          day: this.firstDayFourthWeek + i,
          month: moment(this.date).format("M"),
          year: moment(this.date).format("YYYY"),
          idBook: ""
        });
      }
    }

    for (let d = 6; d >= 0; d--) {
      if (this.calendar[3][d]) {
        this.firstDayFifthWeek = this.calendar[3][d].day + 1;
        break;
      }
    }
    if (this.firstDayFifthWeek <= this.monthDays) {
      this.calendar[4] = [];
      for (let i = 0; i < 7; i++) {
        if (this.firstDayFifthWeek + i <= this.monthDays) {
          this.calendar[4].push({
            day: this.firstDayFifthWeek + i,
            month: moment(this.date).format("M"),
            year: moment(this.date).format("YYYY"),
            idBook: ""
          });
        }
      }
    }

    for (let d = 6; d >= 0; d--) {
      if (this.calendar[4][d]) {
        this.firstDaySixthWeek = this.calendar[4][d].day + 1;
        break;
      }
    }
    if (this.firstDaySixthWeek <= this.monthDays) {
      this.calendar[5] = [];
      for (let i = 0; i < 7; i++) {
        if (this.firstDaySixthWeek + i <= this.monthDays) {
          this.calendar[5].push({
            day: this.firstDaySixthWeek + i,
            month: moment(this.date).format("M"),
            year: moment(this.date).format("YYYY"),
            idBook: ""
          });
        }
      }
    } */
  }

  addWeek(position) {
    let firstDayWeek;

    for (let d = 6; d >= 0; d--) {
      if (this.calendar[position-1][d]) {
        firstDayWeek = this.calendar[position-1][d].day + 1;
        break;
      }
    }
    if (firstDayWeek <= this.monthDays) {
      this.calendar[position] = [];
      for (let i = 0; i < 7; i++) {
        if (firstDayWeek + i <= this.monthDays) {
          this.calendar[position].push({
            day: firstDayWeek + i,
            month: moment(this.date).format("M"),
            year: moment(this.date).format("YYYY"),
            idBook: ""
          });
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
