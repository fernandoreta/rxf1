import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DriversComponent } from './drivers/drivers.component';
import { HomeComponent } from './home/home.component';
import { QualifyingResultsComponent } from './qualifying-results/qualifying-results.component';
import { RacesComponent } from './races/races.component';
import { StandingsComponent } from './standings/standings.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'drivers', component: DriversComponent },
  { path: 'races', component: RacesComponent },
  { path: 'qualifying', component: QualifyingResultsComponent },
  { path: 'standings', component: StandingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
