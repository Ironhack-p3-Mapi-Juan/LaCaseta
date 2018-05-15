import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../../environments/environment";

@Injectable()
export class CalendarService {
  calendar: any;
  options: any = { withCredentials: true };

  constructor(private http: Http) {}

  getCalendar() {
    return this.http
      .get(`${environment.BASEURL}/api/cal`, this.options)
      .map(res => res.json())
      .map(cal => (this.calendar = cal));
  }

  createCalendar() {
    return this.http
      .get(`${environment.BASEURL}/api/cal/new`, this.options)
      .map(res => res.json())
      .map(cal => (this.calendar = cal));
  }

  closeDay(closed) {
    return this.http
      .post(`${environment.BASEURL}/api/cal/closed`, { closed }, this.options)
      .map(res => res.json())
      .map(cal => (this.calendar = cal));
  }

  enableDay(day) {
    return this.http
      .post(`${environment.BASEURL}/api/cal/enable`, { day }, this.options)
      .map(res => res.json())
      .map(cal => (this.calendar = cal));
  }

  getClosedDays() {
    return this.http
      .get(`${environment.BASEURL}/api/cal/closedDays`, this.options)
      .map(res => res.json())
      .map(cal => (this.calendar = cal));
  }
}
