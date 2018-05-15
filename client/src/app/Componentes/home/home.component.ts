import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";


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
  greenBuddies:any;
  yellowBuddies:any;
  redBuddies:any;
  constructor(public sessionService: SessionService, public router: Router, public userService: UserService) {}

  ngOnInit() { }



  //Buscador

  searchBuddy(){
    this.userService.getBuddies(this.pc, this.startDay,this.endDay).subscribe(buddies => {
      console.log(buddies)
      this.buddies = buddies;
      this.greenBuddies = buddies.green
      this.yellowBuddies = buddies.yellow
      this.redBuddies = buddies.red
      console.log(this.greenBuddies, this.redBuddies, this.yellowBuddies)
       this.greenBuddies.forEach(e => {
        this.lat = e.location.coordinates[0];
        this.lng = e.location.coordinates[1];
        console.log(e)
        this.markers.push({lat: e.location.coordinates[0] , lng: e.location.coordinates[1]})
      })
      this.yellowBuddies.forEach(e => {
        this.lat = e.location.coordinates[0];
        this.lng = e.location.coordinates[1]; 
        console.log(e)
    })
    this.redBuddies.forEach(e => {
      this.lat = e.location.coordinates[0];
      this.lng = e.location.coordinates[1]; 
      console.log(e)

  })
    }

    )}

}