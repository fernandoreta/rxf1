import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, switchMap } from 'rxjs';
import { IMRDataResponse } from '../interfaces/Formula1.interface';

@Component({
  selector: 'app-qualifying-results',
  templateUrl: './qualifying-results.component.html',
  styleUrls: ['./qualifying-results.component.scss']
})
export class QualifyingResultsComponent implements OnInit {

  constructor(private http: HttpClient) {}

  seasons = [ 2018, 2019, 2020, 2021, 2022 ];
  
  private yearSelectedSubject = new BehaviorSubject<number>(this.seasons[0]);
  yearSelectedAction$ = this.yearSelectedSubject.asObservable();
  results$ = this.yearSelectedAction$.pipe(
    switchMap((selectedYear: number) => {
      return this.http.get<IMRDataResponse>(`https://ergast.com/api/f1/${selectedYear}/qualifying.json`)
      .pipe(
        map(data => {
          const filterData = data.MRData?.RaceTable?.Races[0]?.QualifyingResults;
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
