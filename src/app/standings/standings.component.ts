import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, switchMap } from 'rxjs';
import { IMRDataResponse } from '../interfaces/Formula1.interface';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandingsComponent implements OnInit {

  constructor(private http: HttpClient) {}

  seasons = [ 2018, 2019, 2020, 2021, 2022 ];
  
  private yearSelectedSubject = new BehaviorSubject<number>(this.seasons[0]);
  yearSelectedAction$ = this.yearSelectedSubject.asObservable();
  standings$ = this.yearSelectedAction$.pipe(
    switchMap((selectedYear: number) => {
      return this.http.get<IMRDataResponse>(`http://ergast.com/api/f1/${selectedYear}/driverStandings.json`)
      .pipe(
        map(data => {
          const filterData = data.MRData?.StandingsTable?.StandingsLists[0].DriverStandings;
          return filterData;
        })
      )
    }),
    catchError(err => {
      console.log(err);
      return EMPTY;
  }));

  pageSizes = [10, 15, 25];

  onSelected(selectedYear: number): void {
    this.yearSelectedSubject.next(selectedYear);
  }

  ngOnInit(): void {
  }

}
