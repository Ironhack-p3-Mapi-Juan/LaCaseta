import { Component, OnInit } from "@angular/core";
import { BookingService } from "../../services/booking.service";
import { Router } from "@angular/router";
import { SessionService } from "../../services/session.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: "app-bookList",
  templateUrl: "./bookList.component.html",
  styleUrls: ["./bookList.component.scss"]
})
export class BookListComponent implements OnInit {
  bookings: any;
  buddyBookings: any;
  search: any;
  idChat: string;

  constructor(
    public bookingService: BookingService,
    public router: Router,
    private modalService: NgbModal,
    public sessionService: SessionService,
    public chatService: ChatService
  ) {
    bookingService.getBookings().subscribe(data => (this.bookings = data));
    bookingService
      .getBuddyBookings()
      .subscribe(data => (this.buddyBookings = data));
  }

  ngOnInit() {}

  cancel(id) {
    this.bookingService.changeStatus("Rejected", id).subscribe(() => {
      this.reload();
      this.router.navigate(["/booking"]);
    });
  }

  accept(id) {
    this.bookingService.changeStatus("Accepted", id).subscribe(() => {
      this.reload();
      this.router.navigate(["/booking"]);
    });
  }

  reload() {
    this.bookingService.getBookings().subscribe(data => (this.bookings = data));
    this.bookingService
      .getBuddyBookings()
      .subscribe(data => (this.buddyBookings = data));
  }

  status(val) {
    this.search = val;
  }

  /* openChat(idBuddy) {
    let customId = idBuddy + "" + this.sessionService.user._id;
    this.chatService.setCustomId(customId);
  } */
}
