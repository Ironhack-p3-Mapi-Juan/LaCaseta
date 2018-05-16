import { Component, OnInit } from '@angular/core';
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  formLogIn = {
    email:"",
    password: ""
  }
  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
  }
  login() {
    this.sessionService
      .login(this.formLogIn)
      .subscribe(() => this.router.navigate(["/home"]));
  }

}
