import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { DogService } from '../../services/dog.service';
import { SessionService } from '../../services/session.service';
import { FileUploader } from 'ng2-file-upload';
import { Dog } from "../../Interfaces/dog-interface"

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.component.html',
  styleUrls: ['./edit-dog.component.css']
})
export class EditDogComponent implements OnInit {

  idDog: string
  uploader: FileUploader 
  dog: Dog
  breedsArray: any;
  breeds: any;
  formEditDog = {
    name: "",
    age: "",
    breed: "",
    tips: "",
    treatment: "",
    picDog: ""
  };

  constructor(
    public router: Router,
    public userService: UserService,
    public dogService: DogService,
    public sessionService: SessionService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.idDog = String(params['id'])
        this.uploader = new FileUploader ({ 
          url: `${environment.BASEURL}/api/dog/edit/${this.idDog}`,
          method: "PUT"
      
        })
      });
    this.dogService.getDog(this.idDog)
    .subscribe(dog => {
      this.formEditDog.name = dog.name;
      this.formEditDog.age= dog.age;
      this.formEditDog.breed= dog.breed;
      this.formEditDog.tips= dog.tips;
      this.formEditDog.treatment= dog.treatment;
      this.formEditDog.picDog= dog.picDog;
    })
    this.dogService.breedDog().subscribe(dataBreed => {
      this.breeds = dataBreed.message;
      this.breedsArray = Object.keys(this.breeds);
    });
  }
  editPageDog(idDog){
    this.idDog = idDog
    console.log('p de dog')
    this.uploader.onBuildItemForm = (item, form) => {
        form.append('name', this.formEditDog.name);
        form.append('age', this.formEditDog.age);
        form.append('breed', this.formEditDog.breed);
        form.append('tips', this.formEditDog.tips);
        form.append('treatment', this.formEditDog.treatment);
        form.append('picDog', this.formEditDog.picDog);
    };
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item, response, status, headers) => this.router.navigate(["/dogs"])
  }

}
