import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, switchMap } from 'rxjs';
import { IMRDataResponse } from '../interfaces/Formula1.interface';

@Component({
  selector: 'app-qualifying-results',
  templateUrl: './qualifying-results.component.html',
  styleUrls: ['./qualifying-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QualifyingResultsComponent implements OnInit {

  constructor(private http: HttpClient) {}

  seasons = [ 2018, 2019, 2020, 2021, 2022 ];

  races = [ 1, 2 ];
  
  private yearSelectedSubject = new BehaviorSubject<number>(this.seasons[0]);
  yearSelectedAction$ = this.yearSelectedSubject.asObservable();

  private raceSelectedSubject = new BehaviorSubject<number>(1);
  raceSelectedAction$ = this.raceSelectedSubject.asObservable();

  resultsDrivers$ = this.yearSelectedAction$.pipe(
    switchMap((selectedYear: number) => {
      return this.http.get<IMRDataResponse>(`https://ergast.com/api/f1/${selectedYear}/qualifying.json`)
      .pipe(
        map(data => {
          const filterData = data.MRData?.RaceTable?.Races;
          return filterData;
        })
      )
    }),
    catchError(err => {
      console.log(err);
      return EMPTY;
  }));
  
  results$ = combineLatest([this.resultsDrivers$, this.raceSelectedAction$])
    .pipe(
      map(([results, raceSelected]) => {
        const filterData = results?.[raceSelected - 1]?.QualifyingResults;
        return filterData;
      })
    )


  pageSizes = [10, 15, 25];

  onSelected(selectedYear: number): void {
    this.yearSelectedSubject.next(selectedYear);
  }

  onSelectedRace(selectedRace: number): void {
    this.raceSelectedSubject.next(selectedRace);
  }

  ngOnInit(): void {
  }

}
