import { Component, OnInit, Input } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { SessionService } from "../../services/session.service";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import { BookingService } from "../../services/booking.service";
const moment = extendMoment(Moment);

@Component({
  selector: "app-public-budy",
  templateUrl: "./public-budy.component.html",
  styleUrls: ["./public-budy.component.scss"]
})
export class PublicBudyComponent implements OnInit {
  idBuddy: string;
  buddy: any;
  startDay: Date;
  endDay: Date;
  totalDays: number;
  totalPrice: number;

  constructor(
    public router: Router,
    public userService: UserService,
    public sessionService: SessionService,
    public route: ActivatedRoute,
    public bookingService: BookingService
  ) {
    this.startDay = this.userService.startDay;
    this.endDay = this.userService.endDay;
    this.totalDays = Math.abs(moment(this.startDay).diff(moment(this.endDay), "days"))
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idBuddy = String(params["id"]);
      this.publicProfile(this.idBuddy);
    });
  }

  publicProfile(idBuddy) {
    this.idBuddy = this.idBuddy;
    this.userService.publicBuddy(idBuddy).subscribe(buddy => {
      this.buddy = buddy;
      this.totalPrice = this.totalDays * this.buddy.rateBuddy;
      this.router.navigate(["/publicBuddy", idBuddy]);
    });
  }

  saveBooking(idBuddy) {
    const info = {
      from: this.startDay,
      to: this.endDay,
      totalPrice: this.totalPrice
    }
    this.bookingService.createBooking(info, idBuddy).subscribe( () => this.router.navigate(["/booking"]));
  }
}
