import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClimateComponent } from './climate/climate.component';

const routes: Routes = [{
  path: '**',
  component: ClimateComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }