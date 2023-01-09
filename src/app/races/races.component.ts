import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, switchMap } from 'rxjs';
import { ErgastServiceService } from '../ergast-service.service';
import { IMRDataResponse } from '../interfaces/Formula1.interface';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RacesComponent implements OnInit {

  constructor(private http: HttpClient) {}

  seasons = [ 2018, 2019, 2020, 2021, 2022 ];
  
  private yearSelectedSubject = new BehaviorSubject<number>(this.seasons[0]);
  yearSelectedAction$ = this.yearSelectedSubject.asObservable();
  races$ = this.yearSelectedAction$.pipe(
    switchMap((selectedYear: number) => {
      return this.http.get<IMRDataResponse>(`https://ergast.com/api/f1/${selectedYear}/last/results.json`)
      .pipe(
        map(data => {
          const filterData = data.MRData?.RaceTable?.Races[0]?.Results;
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
