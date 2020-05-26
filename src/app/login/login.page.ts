import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ProvaiderService } from '../service/provaiders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = "";
  password = "";
  password1 = "";

  constructor(public menu: MenuController, public router: Router, public servi: ProvaiderService) { }

  ngOnInit() {
    this.menu.enable(false);
  }

  Log_in() {
    console.log(this.user);
    console.log(this.password);
    if (this.user != "" && this.password != "") {
      this.servi.SearchUser(this.user).then((data) => {
        if (data != null) {
          this.password1 = data[0].password;
          console.log('aaa', this.password1);
          console.log(this.password);

          if (this.password == this.password1) {
            this.SendData();
            this.menu.enable(true);
            this.router.navigate(['/temperature']);
          } else {
            alert('contraseña incorrecta');
          }
        } else {
          alert('Usuario no registrado');
        }
      }).catch((error) => {
        console.log('el error es ', error);
      });
    } else {
      alert('Debes llenar todos los campos');
    }
  }

  SendData() {
    this.servi.SearchUser(this.user).then((data) => {
      this.servi.InsertData(data);
    }).catch(err => {
      console.log(err);
    })
  }

}
