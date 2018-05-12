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

  closeDays(days, idCalendar) {
    return this.http
      .post(`${environment.BASEURL}/api/cal/closed/${idCalendar}`, days, this.options)
      .map(res => res.json())
      .map(cal => (this.calendar = cal));
  }
}
