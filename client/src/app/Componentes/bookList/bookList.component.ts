import { Component, OnInit } from "@angular/core";
import { BookingService } from "../../services/booking.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-bookList",
  templateUrl: "./bookList.component.html",
  styleUrls: ["./bookList.component.css"]
})
export class BookListComponent implements OnInit {
  bookings: any;

  constructor(public bookingService: BookingService, public router: Router) {
    bookingService.getBookings().subscribe(data => (this.bookings = data));
  }

  ngOnInit() {}

  cancel(id) {
    this.bookingService.changeStatus("Rejected", id).subscribe(() => {
      this.reload();
      this.router.navigate(["/booking"]);
    });
  }

  reload() {
    this.bookingService.getBookings().subscribe(data => (this.bookings = data));
  }
}
