import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../Interfaces/user-interface';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  uploader: FileUploader = new FileUploader ({ 
    url: `${environment.BASEURL}/api/user/edit`,
    method: "PUT"
  })

user: User
  formEdit = {
    name: "",
    surname: "",
    adress: "",
    city: "",
    country: "",
    pc: "",
    email:"",
    pic: "",
    dogBuddy: false, 
    infoBuddy: "",
    rateBuddy: "",
    petsBuddy: "",
    houseBuddy: "",
    zonesBuddy: "",
  }
  constructor(public sessionService: SessionService, public router: Router, public userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
    .subscribe(user => {
      this.formEdit.name = user.name;
      this.formEdit.surname= user.surname;
      this.formEdit.adress= user.adress;
      this.formEdit.city= user.city;
      this.formEdit.country= user.country;
      this.formEdit.pc= user.pc;
      this.formEdit.email=user.email;
      this.formEdit.pic= user.pic;
      this.formEdit.dogBuddy= user.dogBuddy;
      this.formEdit.infoBuddy= user.infoBuddy;
      this.formEdit.rateBuddy= user.rateBuddy;
      this.formEdit.petsBuddy= user.petsBuddy;
      this.formEdit.houseBuddy= user.houseBuddy;
      this.formEdit.zonesBuddy= user.zonesBuddy;
    })
  }

editPage(){
  console.log('p')
  this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.formEdit.name);
      form.append('surname', this.formEdit.surname);
      form.append('adress', this.formEdit.adress);
      form.append('city', this.formEdit.city);
      form.append('country', this.formEdit.country);
      form.append('pc', this.formEdit.pc);
      form.append('email', this.formEdit.email);
      form.append('pic', this.formEdit.pic);
      form.append('dogBuddy', this.formEdit.dogBuddy);
      form.append('infoBuddy', this.formEdit.infoBuddy);
      form.append('rateBuddy', this.formEdit.rateBuddy);
      form.append('petsBuddy', this.formEdit.petsBuddy);
      form.append('houseBuddy', this.formEdit.houseBuddy);
      form.append('zonesBuddy', this.formEdit.zonesBuddy);
  };
  this.uploader.uploadAll();
  this.uploader.onSuccessItem = (item, response, status, headers) => this.router.navigate(["/profile"])
}
}
