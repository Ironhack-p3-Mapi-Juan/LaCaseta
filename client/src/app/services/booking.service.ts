import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../../environments/environment";
import { Booking } from "../Interfaces/booking-interface";

@Injectable()
export class BookingService {
  bookings: Array<Booking>;

  constructor(private http: Http) {}

  getBookings() {
    this.http
      .get(`${environment.BASEURL}/api/book/`)
      .map(res => res.json())
      .map(bookings => this.bookings = bookings);
  }

  createBooking(info, idBuddy) {
    this.http.post(`${environment.BASEURL}/api/book/${idBuddy}`, info)
    .map( res => res.json() )
    .map( bookings => this.bookings = bookings);
  }

  changeStatus(status, idBook) {
    this.http.post(`${environment.BASEURL}/api/book/status/${idBook}`, status)
    .map( res => res.json() )
    .map( bookings => this.bookings = bookings );
  }
}
