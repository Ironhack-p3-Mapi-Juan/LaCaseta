import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { User } from "../Interfaces/user-interface";
import { Dog } from "../Interfaces/dog-interface";



@Injectable()
export class DogService {
dog: Dog
constructor(private http: Http) { }

//Crear perros

newDog() {
    return this.http
      .get(`${environment.BASEURL}/api/dog/new`)
      .map(res => res.json());
  }
  
  //Mostar perros del usuario

  listDogs() {
    return this.http
      .get(`${environment.BASEURL}/api/dog/dogs`)
      .map(res => res.json());
  }

  //Editar perro

  editDog() {
    return this.http
      .get(`${environment.BASEURL}/api/dog/edit`)
      .map(res => res.json());
  }

  //Borrar perro

  deleteDog(idDog) {
    return this.http
      .get(`${environment.BASEURL}/api/dog/delete/${idDog}`)
      .map(res => res.json());
  }

}
