import { Component, OnInit } from "@angular/core";
import { CalendarService } from "../../services/calendar.service";
import * as moment from "moment";
import "moment/locale/es";
import { BookingService } from "../../services/booking.service";
import { SessionService } from "../../services/session.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";

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
  closedDays: Array<any>;

  constructor(
    public calendarService: CalendarService,
    public bookingService: BookingService,
    public sessionService: SessionService,
    private modalService: NgbModal,
    public router: Router
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
    this.calendarService.getClosedDays().subscribe(closedDays => {
      for (let i = 0; i < (this.calendar ? this.calendar.length : 0); i++) {
        for (
          let j = 0;
          j < (this.calendar[i] ? this.calendar[i].length : 0);
          j++
        ) {
          bookings.forEach(e => {
            if (
              this.calendar[i][j].day >=
                parseInt(moment(e.start).format("D")) &&
              this.calendar[i][j].day <= parseInt(moment(e.end).format("D")) &&
              this.calendar[i][j].month >=
                parseInt(moment(e.start).format("M")) &&
              this.calendar[i][j].month <=
                parseInt(moment(e.end).format("M")) &&
              this.calendar[i][j].year >=
                parseInt(moment(e.start).format("YYYY")) &&
              this.calendar[i][j].year <= parseInt(moment(e.end).format("YYYY"))
            ) {
              this.calendar[i][j].idBook = e._id;
              this.calendar[i][j].status = e.status;
              this.calendar[i][j].book = e;
            }
          });

          const dayString =
            this.calendar[i][j].year +
            "/" +
            this.calendar[i][j].month +
            "/" +
            this.calendar[i][j].day;
          if (closedDays.indexOf(dayString) !== -1) {
            this.calendar[i][j].closed = true;
          }
        }
      }
    });
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
    for (let i = 1; i <= 5; i++) {
      this.addWeek(i);
    }
  }

  addWeek(position) {
    let firstDayWeek;

    for (let d = 6; d >= 0; d--) {
      if (this.calendar[position - 1][d]) {
        firstDayWeek = this.calendar[position - 1][d].day + 1;
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

  showContentModal(modal) {
    this.modalService.open(modal).result.then();
  }

  closeDayModal(modal) {
    this.modalService.open(modal).result.then();
  }

  enableDay(day) {
    const date = day.year + "/" + day.month + "/" + day.day;
    this.calendarService.enableDay(date).subscribe(() => this.drawCalendar());
  }

  closeDay(day) {
    const date = day.year + "/" + day.month + "/" + day.day;
    this.calendarService.closeDay(date).subscribe(() => this.drawCalendar());
  }

  accept(id) {
    this.bookingService.changeStatus("Accepted", id).subscribe(() => {
      this.drawCalendar();
    });
  }

  reject(id) {
    this.bookingService.changeStatus("Rejected", id).subscribe(() => {
      this.drawCalendar();
    });
  }

  getClosedDays() {
    this.calendarService
      .getClosedDays()
      .subscribe(data => (this.closedDays = data));
  }
}
