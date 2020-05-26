import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProvaiderService {

  data;


  constructor(public http: HttpClient) { }

  url = "https://agrofighterspro.herokuapp.com";

  CreateUser(body) {
    const promesa = new Promise((resolve, reject) => {
      return this.http.post(this.url + '/create/user/', body).subscribe((res) => {
        console.log('Provider service ok:');
        resolve(res);
      }, (error) => {
        console.log('Provider service bad:');
        console.log(error);
        reject(error);
      });
    });
    return promesa;
  }

  SearchUserId(id) {
    const promesa = new Promise((resolve, reject) => {
      return this.http.get(this.url + '/user/' + id).subscribe((res) => {
        console.log('Provider service ok:');
        resolve(res);
      }, (error) => {
        console.log('Provider service bad:');
        console.log(error);
        reject(error);
      });
    });
    return promesa;
  }

  SearchUser(user) {
    const promesa = new Promise((resolve, reject) => {
      return this.http.get(this.url + '/search/user/' + user).subscribe((res) => {
        console.log('Provider service ok:');
        resolve(res);
      }, (error) => {
        console.log('Provider service bad:');
        console.log(error);
        reject(error);
      });
    });
    return promesa;
  }


  ExtractTemperature() {
    const promesa = new Promise((resolve, reject) => {
      return this.http.get(this.url + '/get/temperature/1/').subscribe((res) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
    return promesa;
  }


  ExtractHumedity() {
    const promesa = new Promise((resolve, reject) => {
      return this.http.get(this.url + '/get/humidity/1/').subscribe((res) => {
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
    return promesa;
  }
  ExtratAlertAplication(){
    const promesa = new Promise((resolve, reject) => {
      return this.http.get(this.url + '/get/alert/').subscribe((res) =>{ 
        resolve(res);
      }, (error) => {
        reject(error);
      });
    });
    return promesa;
  }


  ExtractDataAplication() {
    const promesa = new Promise((resolve, reject) => {
      return this.http.get(this.url + '/get/information/aplication/').subscribe((res) => {
        console.log('Provider service ok:');
        resolve(res);
      }, (error) => {
        console.log('Provider service bad:');
        console.log(error);
        reject(error);
      });
    });
    return promesa;
  }

  UpdateInformationUser(id, data) {
    const promesa = new Promise((resolve, reject) => {
      return this.http.post(this.url + '/update/information/user/'+id, data).subscribe((res) => {
        console.log('Provider service ok:');
        console.log(data);
        resolve(res);
      }, (error) => {
        console.log('Provider service bad:');
        console.log(error);
        reject(error);
      });
    });
    return promesa;
  }

  InsertData(dato) {
    this.data = dato;
  }

  getData() {
    return this.data;
  }

}
