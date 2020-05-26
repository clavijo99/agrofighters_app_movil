import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ProvaiderService } from './service/provaiders.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  version;
  date;
  company;
  information = [
    {
      version: '1.0',
      date: '2020:12;03',
      company: 'pepe'
    }
  ]
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'temperature',
      url: '/temperature',
      icon: 'analytics'
    },
    {
      title: 'Mecanismo',
      url: '/mechanisms',
      icon: 'wifi'
    },
    {
      title: 'Configuraciones',
      url: '/setting',
      icon: 'build'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private servi: ProvaiderService,
  ) {
    this.initializeApp();
    this.ExtractData();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  ExtractData() {
    this.servi.ExtractDataAplication().then(data => {
      this.version = data[0].version;
      this.date = data[0].date;
      this.company = data[0].company;
    })
    setTimeout(() => {
      this.servi.ExtractDataAplication().then(data => {
        this.version = data[0].version;
        this.date = data[0].date;
        this.company = data[0].company;
      })
    }, 10000);
  }
}
