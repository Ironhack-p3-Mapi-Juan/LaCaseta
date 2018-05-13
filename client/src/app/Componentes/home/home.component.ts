import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";

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

  constructor(public sessionService: SessionService) {
    this.getPosition();
  }

  ngOnInit() { }

  getPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition( (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      })
    }
  }
}
