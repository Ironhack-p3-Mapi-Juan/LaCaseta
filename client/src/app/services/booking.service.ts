import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../../environments/environment";
import { Booking } from "../Interfaces/booking-interface";

@Injectable()
export class BookingService {
  options: any = { withCredentials: true };

  constructor(private http: Http) {}

  getBookings() {
    return this.http
      .get(`${environment.BASEURL}/api/book/`, this.options)
      .map(res => res.json());
  }

  getBuddyBookings() {
    return this.http
      .get(`${environment.BASEURL}/api/book/buddy`, this.options)
      .map(res => res.json());
  }

  createBooking(info, idBuddy) {
    return this.http
      .post(`${environment.BASEURL}/api/book/${idBuddy}`, info, this.options)
      .map(res => res.json());
  }

  changeStatus(status, idBook) {
    return this.http
      .post(
        `${environment.BASEURL}/api/book/status/${idBook}`,
        status,
        this.options
      )
      .map(res => res.json());
  }
}
