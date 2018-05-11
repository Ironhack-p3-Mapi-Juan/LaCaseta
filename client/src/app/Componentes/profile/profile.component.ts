import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(public router: Router, public userService: UserService, public sessionService: SessionService) { }

  ngOnInit() {
    this.profile()
  }
  profile() {
    this.userService
      .profileUser()
      .subscribe(u => {
        console.log(u)
         this.router.navigate(["/profile"])
      });
  }
  edit() {
    this.userService
      .editUser()
      .subscribe(() => this.router.navigate(["/profile/edit"]));
  }
}
