import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../../environments/environment";
import { Booking } from "../Interfaces/booking-interface";

@Injectable()
export class BookingService {
  bookings: Array<Booking>;

  constructor(private http: Http) {}

  getBookings() {
    return this.http
      .get(`${environment.BASEURL}/api/book/`)
      .map(res => res.json())
      .map(bookings => (this.bookings = bookings));
  }

  createBooking(info, idBuddy) {
    return this.http
      .post(`${environment.BASEURL}/api/book/${idBuddy}`, info)
      .map(res => res.json())
      .map(bookings => (this.bookings = bookings));
  }

  changeStatus(status, idBook) {
    return this.http
      .post(`${environment.BASEURL}/api/book/status/${idBook}`, status)
      .map(res => res.json())
      .map(bookings => (this.bookings = bookings));
  }
}
