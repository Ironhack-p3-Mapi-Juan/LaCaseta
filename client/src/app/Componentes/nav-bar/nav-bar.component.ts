import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  idUser: any;  

  constructor(public sessionService: SessionService, public router: Router, public userService: UserService) { }

  ngOnInit() {
  }
  profile() {
    this.userService
      .profileUser(this.idUser)
      .subscribe(() => this.router.navigate(["/profile"]));
  }
  
  logout(){
    this.sessionService
    .logout()
    .subscribe(() => this.router.navigate(["/home"]))
  }

}
