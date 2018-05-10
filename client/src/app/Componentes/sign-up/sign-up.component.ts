import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formSignUp = {
    name: "",
    surname: "",
    adress: "",
    pc: "",
    email:"",
    password: "",
    dogBuddy: false, 
    infoBuddy: "",
    rateBuddy: "",
    petsBuddy: "",
    houseBuddy: "",
    zonesBuddy: "",
  }

  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
  }
  signup() {
    this.sessionService
      .signup(this.formSignUp)
      .subscribe(() => this.router.navigate(["/home"]));
  }
  buddyTrue(){
    this.formSignUp.dogBuddy ? this.formSignUp.dogBuddy = false : this.formSignUp.dogBuddy = true;
  }
}
