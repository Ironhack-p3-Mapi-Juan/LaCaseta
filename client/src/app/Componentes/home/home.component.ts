import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import * as _ from "lodash";

const moment = extendMoment(Moment);

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  title: string = "La Caseta de Juanpi";
  lat: number;
  lng: number;
  zoom: number = 14;
  pc: string;
  buddies: any;
  markers: Array<any> = [];
  startDay: any;
  endDay: any;
  greenBuddies: any;
  yellowBuddies: any;
  redBuddies: any;
  totalDays: number;
  constructor(
    public sessionService: SessionService,
    public router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {}

  //Buscador

  searchBuddy() {
    let freeBuddies = [];
    this.totalDays = Math.abs(
      moment(this.startDay).diff(moment(this.endDay), "days")
    );
    this.userService
      .getBuddies(this.pc, this.startDay, this.endDay)
      .subscribe(calendars => {
        const range = moment.range(this.startDay, this.endDay);
        let tmp = [];

        freeBuddies = calendars.filter(calendar => {
          tmp = [];
          calendar.closedDays.forEach(e => {
            tmp.push(range.contains(moment(e)));
          });

          tmp = _.uniq(tmp);

          if (tmp.length == 0 || tmp[0] == false) {
            return calendar;
          }
        });

        let publicBuddies = freeBuddies.map(e => {
          return e.user;
        });

        Promise.all(publicBuddies)
          .then(data => {
            this.buddies = data;
            this.buddies.forEach(e => {
              this.lat = e.location.coordinates[0];
              this.lng = e.location.coordinates[1];
              this.markers.push({
                lat: e.location.coordinates[0],
                lng: e.location.coordinates[1]
              });
            });
          })
          .catch(err => console.log(err));
      });
    
  }
}
