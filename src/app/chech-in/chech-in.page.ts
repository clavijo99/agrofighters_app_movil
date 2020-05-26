import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProvaiderService } from '../service/provaiders.service';

@Component({
  selector: 'app-chech-in',
  templateUrl: './chech-in.page.html',
  styleUrls: ['./chech-in.page.scss'],
})
export class ChechInPage implements OnInit {
  
  name = "";
  last_name = "";
  id = "";
  phone = "";
  email = "";
  user = "";
  password = "";
  password1 = "";

  body;


  constructor(public router: Router, public servi: ProvaiderService) { }

  ngOnInit() { }

  RegisterUser() {
    if (this.VerifyCampo() == true && this.VerifyPassword() == true && this.VerifyLengthPassword() == true) {
      this.fillBody();
      this.VerifyCreateUserId();
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

  VerifyCreateUserId() {
    this.servi.SearchUserId(this.id).then(data => {
      if (data == null) {
        this.VerifyCreateUser();
      } else {
        alert('El usuario ya se encuentra registrado.');
        this.router.navigate(['/login']);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  VerifyCreateUser() {
    this.servi.SearchUser(this.user).then(data => {
      if (data == null) {
        this.ServiceCreateUser();
      } else {
        alert('Nombre de usuario no disponible');
      }
    })
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

  ServiceCreateUser() {
    console.log('este es el body de la funtion', this.body);
    this.servi.CreateUser(this.body).then(data => {
      console.log(data);
      if (data != null) {
        alert('Usuario creado');
        this.router.navigate(['/login']);
      } else {
        alert('Error al crear el usuario');
      }
    }).catch(err => {
      console.log(err);
      alert('Error al crear usuario');
    });
  }
}
