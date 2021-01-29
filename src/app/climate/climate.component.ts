import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VirtualTimeScheduler } from 'rxjs';
import { ClimateProvider } from 'src/providers/climate';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.component.html',
  styleUrls: ['./climate.component.scss']
})
export class ClimateComponent implements OnInit {

  public position = -2;
  public firstDay = 0;
  public lastDay = 6;

  private climateInfo: any;
  public forecast = [];
  public forecastDays = [];

  constructor(
    private snackBar: MatSnackBar,
    private climateProvider: ClimateProvider
  ) { }

  ngOnInit(): void {
    this.climateProvider.getClimateInfo().then(res => {
      this.climateInfo = res
      this.forecastDays = this.climateInfo.results.forecast
      this.sliceForecast()
    }).catch(err => {
      console.log("ERR: ", err)
      this.openSnackBar('Ocorreu um erro ao buscar os dados climáticos. Por favor, tente novamente mais tarde', "FECHAR")
    })
  }

  sliceForecast(keep?) {
    if (!keep) this.position = -3
    this.forecast = this.forecastDays.slice(this.firstDay, this.lastDay + 1)
  }

  changeWeekDay() {
    switch (this.position) {
      case -1:
        this.firstDay = 0;
        this.lastDay = 9;
        break;
      case -2:
        this.firstDay = 0;
        this.lastDay = 6;
        break;
      default:
        this.firstDay = this.position;
        this.lastDay = this.position;
        break;
    }
    this.sliceForecast(true);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}