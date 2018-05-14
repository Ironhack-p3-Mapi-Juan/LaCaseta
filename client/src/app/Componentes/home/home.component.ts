import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  title: string = "La Caseta de Juanpi";
  lat: number;
  lng: number;
  zoom: number = 14;
  pc: string;
  buddies: any;
  markers: Array<any> = [];

  constructor(public sessionService: SessionService, public router: Router, public userService: UserService) {
    this.getPosition();
  }

  ngOnInit() { }

  getPosition() {
    /* if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      }) 
    }*/
  }
  //Buscador

  searchBuddy(){
    this.userService.getBuddies(this.pc).subscribe( buddies => {
      this.buddies = buddies
      buddies.forEach(e => {
        this.lat = e.location.coordinates[0];
        this.lng = e.location.coordinates[1];
        console.log(e)
        this.markers.push({lat: e.location.coordinates[0] , lng: e.location.coordinates[1]})
      });
    })
  }

}
