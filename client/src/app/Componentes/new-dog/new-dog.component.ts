import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DogService } from '../../services/dog.service';
import { SessionService } from '../../services/session.service';
import { Dog } from "../../Interfaces/dog-interface";
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-new-dog',
  templateUrl: './new-dog.component.html',
  styleUrls: ['./new-dog.component.scss']
})
export class NewDogComponent implements OnInit {

  uploader: FileUploader = new FileUploader ({ 
    url: `${environment.BASEURL}/api/dog/new`,
  })

  dog: Dog
  formDog = {
    name: "",
    age:"",
    breed: "",
    tips: "",
    treatment: "",
    picDog: ""
  }
  feedback: string;
  breeds: any;
  breedsArray: any;
  constructor(
    public router: Router,
    public userService: UserService,
    public dogService: DogService,
    public sessionService: SessionService
  ) { }

     ngOnInit() {
    
        this.dogService.breedDog().subscribe( dataBreed => {
          this.breeds = dataBreed.message
          this.breedsArray = Object.keys(this.breeds);
          console.log(this.breedsArray)
          
        })
   }
   dogNew() {
    
  } 
  newDog() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.formDog.name);
      form.append('age', this.formDog.age);
      form.append('breed', this.formDog.breed);
      form.append('tips', this.formDog.tips);
      form.append('treatment', this.formDog.treatment);
      
      
    };
    
    this.uploader.uploadAll()
    this.uploader.onSuccessItem = (item, response, status, headers) => this.router.navigate(["/dogs"])
    /* this.dogService
    .newDog(this.formDog)
    .subscribe(() => this.router.navigate(["/dogs"])); */
    }

  }
  


