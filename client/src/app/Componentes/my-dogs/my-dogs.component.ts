import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { DogService } from '../../services/dog.service';
import { Dog } from "../../Interfaces/dog-interface";


@Component({
  selector: 'app-my-dogs',
  templateUrl: './my-dogs.component.html',
  styleUrls: ['./my-dogs.component.scss']
})
export class MyDogsComponent implements OnInit {
 dogArray: Array<Dog>
  constructor(
    public router: Router,
    public userService: UserService,
    public dogService: DogService,
    public sessionService: SessionService
  ) { }

  ngOnInit() {
    this.myDogs();
  }
  myDogs() {
    this.dogService.listDogs().subscribe(dogArray => {
      this.dogArray = dogArray;
    });
}
}
