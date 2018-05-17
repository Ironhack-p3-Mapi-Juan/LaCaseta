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
    url: `${environment.BASEURL}/api/user/edit`,
    method: "PUT"
  });

  user: User;
  name: any;
  surname: any;
  adress: any;
  city: any;
  country: any;
  pc: any;
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
  }
}
