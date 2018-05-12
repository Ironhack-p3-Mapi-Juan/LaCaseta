import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  title: string = "La Caseta de Juanpi";
  lat: number = 37.195984;
  lng: number = -3.621656;
  zoom: number = 13;

  constructor(public sessionService: SessionService) {}

  ngOnInit() {}
}
