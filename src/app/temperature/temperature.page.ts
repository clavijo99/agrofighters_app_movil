import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProvaiderService } from '../service/provaiders.service';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.page.html',
  styleUrls: ['./temperature.page.scss'],
})
export class TemperaturePage implements OnInit {


  intervalUpdate: any = null;
  public chart1: any = null;
  public chart2: any = null;

  n = "#";
  m = "";
  t1 = "";
  t2 = "";
  t3 = "";



  constructor(private servi: ProvaiderService, public route: Router) {
  }

  ngOnInit(): void {
    this.chart1 = new Chart('realtime1', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Data',
            fill: false,
            data: [],
            backgroundColor: '#168ede',
            borderColor: '#168ede'
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white"
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
              beginAtZero: true
            }
          }]
        }
      }
    });

    this.chart2 = new Chart('realtime2', {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Data',
            fill: false,
            data: [],
            backgroundColor: '#168ede',
            borderColor: '#168ede'
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "white"
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: "white",
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.ExtractData();
    this.intervalUpdate = setInterval(function () {
      this.ExtractData();
    }.bind(this), 10000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }


  ExtractData() {
    var dat;
    if (this.chart1.data.labels.length > 15) {
      this.chart1.data.labels.shift();
      this.chart1.data.datasets[0].data.shift();
    } else {
      let chartTime1: any = new Date();
      chartTime1 = chartTime1.getHours() + ':' + ((chartTime1.getMinutes() < 10) ? '0' + chartTime1.getMinutes() : chartTime1.getMinutes()) + ':' + ((chartTime1.getSeconds() < 10) ? '0' + chartTime1.getSeconds() : chartTime1.getSeconds());
      this.chart1.data.labels.push(chartTime1);
      this.servi.ExtractTemperature().then((res) => {
        this.chart1.data.datasets[0].data.push(res);
        dat = res;
      });
      if (dat < 10) {
        this.t1 = dat.toString();
        this.t2 = "";
        this.t3 = "";
      } else {
        if (dat >= 10 && dat <= 20) {
          this.t2 = dat.toString();
          this.t1 = "";
          this.t3 = "";
        } else {
          if (dat > 20) {
            this.t3 = dat.toString();
            this.t1 = "";
            this.t2 = "";
          }
        }
      }
      this.chart1.update();
    }


    if (this.chart2.data.labels.length > 15) {
      this.chart2.data.labels.shift();
      this.chart2.data.datasets[0].data.shift();
    } else {
      let chartTime2: any = new Date();
      chartTime2 = chartTime2.getHours() + ':' + ((chartTime2.getMinutes() < 10) ? '0' + chartTime2.getMinutes() : chartTime2.getMinutes()) + ':' + ((chartTime2.getSeconds() < 10) ? '0' + chartTime2.getSeconds() : chartTime2.getSeconds());
      this.chart2.data.labels.push(chartTime2);
      this.chart2.data.datasets[0].data.push((Math.random() * (30 - 1) + 1));
      this.servi.ExtractHumedity().then((res) => {
        this.chart1.data.datasets[0].data.push(res);
        dat = res;
      });
      if (dat < 10) {
        this.t1 = dat.toString();
        this.t2 = "";
        this.t3 = "";
      } else {
        if (dat >= 10 && dat <= 20) {
          this.t2 = dat.toString();
          this.t1 = "";
          this.t3 = "";
        } else {
          if (dat > 20) {
            this.t3 = dat.toString();
            this.t1 = "";
            this.t2 = "";
          }
        }
      }
      this.chart2.update();
    }
  }
}