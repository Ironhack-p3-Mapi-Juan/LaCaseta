import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { User } from '../../Interfaces/user-interface';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(public router: Router, public userService: UserService, public sessionService: SessionService) { }

  ngOnInit() {
    this.profile()
  }
  profile() {
    this.userService
      .profileUser()
      .subscribe(user => {
        this.user =  user;
        console.log("Esto es un user: " + user.name)

         this.router.navigate(["/profile"])
      });
  }
  edit() {
        this.router.navigate(["/edit"])
  }
  delete(){
    this.userService
    .deleteUser()
    .subscribe(() => this.router.navigate(["/home"]))
  }
}
