import { Component, OnInit } from '@angular/core';
import { ProvaiderService } from '../service/provaiders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  body;
  data;
  name = "";
  last_name = "";
  id = "";
  phone = "";
  email = "";
  user = "";
  password = "";
  password1 = "";

  constructor(private servi: ProvaiderService, private router: Router) { 
    this.data = this.servi.getData();
    this.name = this.data[0].name;
    this.last_name = this.data[0].last_name;
    this.id = this.data[0].id;
    this.phone = this.data[0].phone;
    this.email = this.data[0].email;
    this.user = this.data[0].user;
    this.password = this.data[0].password;
    this.password1 = this.data[0].password; 
  }

  ngOnInit() {
   }


  UpdateInformation() {
    if (this.VerifyCampo() == true && this.VerifyPassword() == true && this.VerifyLengthPassword() == true) {
      if(this.user == this.data[0].user){
        this.SendInformation();
      }else{
        this.servi.SearchUser(this.user).then(res => {
          if(res == null ){
            this.SendInformation();
          }else{
            alert('Usuario no disponible');
          }
        });
      }
    }
  }

  VerifyCampo() {
    if (this.name != "" && this.last_name != "" && this.id != "" && this.phone != "" && this.email != "" && this.user != "" && this.password != "" && this.password1 != "") {
      return true;
    } else {
      alert('Debes  llenar los campos');
      return false;
    }
  }

  VerifyPassword() {
    if (this.password == this.password1) {
      return true;
    } else {
      alert('Contraseñas incorrectas');
      return false;
    }
  }

  VerifyLengthPassword() {
    if (this.password.length > 8) {
      return true;
    } else {
      alert('La contraseña debe ser mayor a 8 caracteres');
      return false;
    }
  }


  fillBody() {
    this.body = {
      'name': this.name,
      'last_name': this.last_name,
      'id': this.id,
      'email': this.email,
      'phone': this.phone,
      'user': this.user,
      'password': this.password
    }
  }

  UpdateData(data){
    this.servi.InsertData(data);
    console.log(data);
    this.router.navigate(['/temperature']);
  }

  SendInformation(){
    this.fillBody();
    this.servi.UpdateInformationUser(this.data[0].id, this.body).then(res => {
      if(res != null){
        alert('Datos actualizados');
        this.UpdateData(this.body);
      }else{
        alert('Error al actualizar los datos')
      }
    });
  }

}
