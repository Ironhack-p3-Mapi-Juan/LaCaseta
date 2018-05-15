import { environment } from '../../../environments/environment';
import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  
  error: string;
  
  formSignUp = {
    name: "",
    surname: "",
    adress: "",
    city: "",
    country: "",
    pc: "",
    email:"",
    password: "",
    dogBuddy: false, 
    infoBuddy: "",
    rateBuddy: "",
    petsBuddy: "",
    houseBuddy: "",
    zonesBuddy: "",
    calendarID: ""
  }
  
  constructor(public sessionService: SessionService, public router: Router) { }
  
  ngOnInit() {
  }
  
  // V E R S I O N   O R I G I N A L
  signup() {
    
    this.sessionService
      .signup(this.formSignUp)
      .subscribe(() => this.router.navigate(["/profile"]));
  }


    // I N I C I O   D E  P R U E B A
  //  signup() {
  //    this.sessionService
  //    .signup(this.formSignUp)
  //     .subscribe(
  //       (user) => this.successCb(user), <--- no redireccion, llama función EXITO
  //       (err) => this.errorCb(err) <--- lo llevo al error handler para mostrar error
  //     );
  // }

  //  errorCb(err) { <---- prepara la variable error
  //   this.error = err;
  //  this.user = numm;
  //  }

  // successCb(user) {  <---- prepara la variable user
  //   this.user = user;
  //   this.error = null;
  // }

  // F I N   D E  P R U E B A


  buddyTrue(){
    this.formSignUp.dogBuddy ? this.formSignUp.dogBuddy = false : this.formSignUp.dogBuddy = true;
  }
}
