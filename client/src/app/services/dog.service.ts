
import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Rx";
import { environment } from "../../environments/environment";
import { User } from "../Interfaces/user-interface";
import { Dog } from "../Interfaces/dog-interface";

@Injectable()
export class DogService {
  dog: Dog;
  options: any = { withCredentials: true };
  constructor(private http: Http) {}

  //Obtener Perro

  getDog(idDog) {
    return this.http
      .get(`${environment.BASEURL}/api/dog/get-dog/${idDog}`, this.options)
      .map(res => res.json());
  }

  //Crear perros

  newDog(dog) {
    return this.http
      .post(`${environment.BASEURL}/api/dog/new`, dog, this.options)
      .map(res => res.json());
  }

  //Mostar perros del usuario

  listDogs() {
    return this.http
      .get(`${environment.BASEURL}/api/dog/dogs`, this.options)
      .map(res => res.json());
  }

  //Editar perro

  editDog(idDog) {
    return this.http
      .get(`${environment.BASEURL}/api/dog/edit/${idDog}`, this.options)
      .map(res => res.json());
  }

  //Borrar perro

  deleteDog(idDog) {
    return this.http
      .get(`${environment.BASEURL}/api/dog/delete/${idDog}`, this.options)
      .map(res => res.json());
  }


  //APIDog

  breedDog() {
    return this.http
      .get(`https://dog.ceo/api/breeds/list/all`)
      .map(res => res.json());
  }
}
