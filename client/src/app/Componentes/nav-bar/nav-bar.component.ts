import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../Interfaces/user-interface";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"]
})
export class NavBarComponent implements OnInit {
  idUser: any;
  user: User;
  constructor(
    public sessionService: SessionService,
    public router: Router,
    //public userService: UserService
  ) { }

  ngOnInit() {
    this.profile();
  }
  profile() {
<<<<<<< HEAD
    /* this.userService.profileUser().subscribe(user => {
      this.user = user;
    }); */
=======
    this.userService
      .profileUser()
      .subscribe( user =>{
        this.user = user;
        console.log(this.user)
         
        });
>>>>>>> 74f382738db3a4cc9e377ba82df07c9f42b4c1bd
  }

  logout() {
    this.sessionService.logout().subscribe(() => {
      this.user = null;
      this.router.navigate(["/home"]);
    });
  }
}
