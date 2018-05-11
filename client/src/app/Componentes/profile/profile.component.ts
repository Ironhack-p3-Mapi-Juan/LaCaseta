import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  idUser: any;
  constructor(public router: Router, public userService: UserService) { }

  ngOnInit() {
  }
  profile() {
    this.userService
      .profileUser(this.idUser)
      .subscribe(() => this.router.navigate(["/profile"]));
  }
}
