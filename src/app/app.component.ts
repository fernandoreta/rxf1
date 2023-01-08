import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTitle = 'Formula 1 Championship since 2018 to 2022';
  home = 'standings';
  menu = [
    { title: 'Home', route: 'home' },
    { title: 'Drivers', route: 'drivers' },
    { title: 'Races per season with final results', route: 'races' },
    { title: 'Qualifying Results', route: 'qualifying' },
    { title: 'Standings', route: 'standings' }
  ]
}
