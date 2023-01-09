import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageTitle = 'Formula 1 Championship';
  home = 'standings';
  menu = [
    { title: 'Home', route: 'home' },
    { title: 'Drivers', route: 'drivers' },
    { title: 'Races per season with final results', route: 'races' },
    { title: 'Qualifying Results', route: 'qualifying' },
    { title: 'Standings', route: 'standings' },
    { title: '2021 season', route: '2021' },
  ]
}
