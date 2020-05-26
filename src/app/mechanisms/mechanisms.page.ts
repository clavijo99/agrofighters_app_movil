import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProvaiderService } from '../service/provaiders.service';

@Component({
  selector: 'app-mechanisms',
  templateUrl: './mechanisms.page.html',
  styleUrls: ['./mechanisms.page.scss'],
})
export class MechanismsPage implements OnInit {

  Wifion = "";
  Wifioff = "";
  Sensor1on = "";
  Sensor1off = "";
  Sensor2on = "";
  Sensor2off = "";
  Engginer1on = "";
  Engginer1off = "";
  Engginer2on = "";
  Engginer2off = "";

  intervalUpdate: any = null;

  constructor(private servi: ProvaiderService) { }

  ngOnInit() {
    this.AddData();
    this.intervalUpdate = setInterval(function () {
      this.AddData();
    }.bind(this), 15000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }

  AddData() {
    this.servi.ExtratAlertAplication().then((data) => {
      if (data != null) {
        console.log('data', data[0].connection_alert);
        if (data[0].connection_alert == "false") {
          this.Wifion = "ON";
          this.Wifioff = "";
        } else {
          this.Wifion = "";
          this.Wifioff = "OFF";
        }
        if (data[0].error_sensor_temperature == "false") {
          this.Sensor1on = "ON";
          this.Sensor1off = "";
        } else {
          this.Sensor1on = "";
          this.Sensor1off = "OFF";
        }
        if (data[0].error_sensor_humidity == "false") {
          this.Sensor2on = "ON";
          this.Sensor2off = "";
        } else {
          this.Sensor2on = "";
          this.Sensor2off = "OFF";
        }
        if (data[0].engine_errors_1 == "false") {
          this.Engginer1on = "ON";
          this.Engginer1off = "";
        } else {
          this.Engginer1on = "";
          this.Engginer1off = "OFF";
        }
        if (data[0].engine_errors_2 == "false") {
          this.Engginer2on = "ON";
          this.Engginer2off = "";
        } else {
          this.Engginer2on = "";
          this.Engginer2off = "OFF";
        }
      }
    });
  }
}
