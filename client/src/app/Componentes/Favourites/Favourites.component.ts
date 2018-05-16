import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-Favourites",
  templateUrl: "./Favourites.component.html",
  styleUrls: ["./Favourites.component.scss"]
})
export class FavouritesComponent implements OnInit {
  favourites: Array<any>;

  constructor(
    public sessionService: SessionService,
    public userService: UserService
  ) {
    this.getFavourites();
  }

  ngOnInit() {}

  getFavourites() {
    this.userService.getFavourites().subscribe(favourites => {
      this.favourites = favourites;
      console.log(this.favourites);
    });
  }
}
