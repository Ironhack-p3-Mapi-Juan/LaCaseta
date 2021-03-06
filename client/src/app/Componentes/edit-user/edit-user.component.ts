import { environment } from "../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../Interfaces/user-interface";
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: `${environment.BASEURL}/api/user/edit`
  });

  user: User;
  name: any;
  surname: any;
  adress: any;
  city: any;
  country: any;
  pc: any;
  pic: any;
  email: any;
  infoBuddy: any;
  rateBuddy: any;
  petsBuddy: any;
  houseBuddy: any;
  zonesBuddy: any;
  constructor(
    public sessionService: SessionService,
    public router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe(user => {
      this.user = user;
      this.name = user.name;
      this.surname = user.surname;
      this.adress = user.adress;
      this.city = user.city;
      this.country = user.country;
      this.pc = user.pc;
      this.email = user.email;
      this.infoBuddy = user.infoBuddy;
      this.rateBuddy = user.rateBuddy;
      this.petsBuddy = user.petsBuddy;
      this.houseBuddy = user.houseBuddy;
      this.zonesBuddy = user.zonesBuddy;
    });
  }

  editPage() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("name", this.name);
      form.append("surname", this.surname);
      form.append("adress", this.adress);
      form.append("city", this.city);
      form.append("country", this.country);
      form.append("pc", this.pc);
      form.append("email", this.email);
      form.append("infoBuddy", this.infoBuddy);
      form.append("rateBuddy", this.rateBuddy);
      form.append("petsBuddy", this.petsBuddy);
      form.append("houseBuddy", this.houseBuddy);
      form.append("zonesBuddy", this.zonesBuddy);
    };
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item, response, status, headers) =>
      this.router.navigate(["/profile"]);

    /* let info = {
      name: this.name ? this.name : this.user.name,
      surname: this.surname ? this.surname : this.user.surname,
      adress: this.adress ? this.adress : this.user.adress,
      city: this.city ? this.city : this.user.city,
      country: this.country ? this.country : this.user.country,
      pc: this.pc ? this.pc : this.user.pc,
      email: this.email ? this.email : this.user.email,
      infoBuddy: this.infoBuddy ? this.infoBuddy : this.user.infoBuddy,
      rateBuddy: this.rateBuddy ? this.rateBuddy : this.user.rateBuddy,
      petsBuddy: this.petsBuddy ? this.petsBuddy : this.user.petsBuddy,
      houseBuddy: this.houseBuddy ? this.houseBuddy : this.user.houseBuddy,
      zonesBuddy: this.zonesBuddy ? this.zonesBuddy : this.user.zonesBuddy,
    }

    this.userService.editUser(info).subscribe(() => this.router.navigate(["/profile"])); */
  }
}
