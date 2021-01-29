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

  public name = new FormControl('', [Validators.required]);
  public company = new FormControl('', [Validators.required]);
  public latitude = new FormControl('', [Validators.required]);
  public longitude = new FormControl('', [Validators.required]);

  public managers = []
  public operators = []
  public vehicles = []
  public position = -1;

  private climateInfo: any;
  public forecast: any;
  public inputVehicle: any
  public inputOperator: any;
  public inputManager: any;
  public marker: any

  constructor(
    private snackBar: MatSnackBar,
    private climateProvider: ClimateProvider
  ) { }

  ngOnInit(): void {
    
    this.climateProvider.getClimateInfo().then(res => {

      this.climateInfo = res
      this.forecast = this.climateInfo.results.forecast
      console.log(this.forecast)
    }).catch(err => {
      console.log("ERR: ", err)
      this.openSnackBar('Ocorreu um erro ao buscar os dados das empresas. Por favor, tente novamente mais tarde', "FECHAR")
    })
  }

  onSubmit() {
  
  }

  validateFields() {
    if (!this.name.valid) {
      this.name.markAsTouched()
      return this.openSnackBar('O campo "Nome" é obrigatório!', 'OK')
    } else if (!this.company.valid) {
      this.company.markAsTouched()
      return this.openSnackBar('O campo "Empresa" é obrigatório!', 'OK')
    } else if (!this.latitude.valid) {
      this.latitude.markAsTouched()
      return this.openSnackBar('O campo "Latitude" é obrigatório!', 'OK')
    } else if (!this.longitude.valid) {
      this.longitude.markAsTouched()
      return this.openSnackBar('O campo "Longitude" é obrigatório!', 'OK')
    } else {
      return true
    }
  }

  clearFields() {
    this.vehicles = []
    this.managers = []
    this.operators = []
    this.name.reset()
    this.company.reset()
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}