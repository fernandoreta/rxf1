import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, switchMap } from 'rxjs';
import { IMRDataResponse } from '../interfaces/Formula1.interface';

@Component({
  selector: 'app-qualifying-results',
  templateUrl: './qualifying-results.component.html',
  styleUrls: ['./qualifying-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QualifyingResultsComponent implements AfterViewInit {

  constructor(private http: HttpClient) {}

  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild('paginator') paginator!: MatPaginator;

  seasons = [ 2018, 2019, 2020, 2021, 2022 ];

  races = [ 1, 2 ];

  displayedColumns: string[] = [
    'number',
    'position',
    'name'
  ];
  
  private yearSelectedSubject = new BehaviorSubject<number>(this.seasons[0]);
  yearSelectedAction$ = this.yearSelectedSubject.asObservable();

  private raceSelectedSubject = new BehaviorSubject<number>(1);
  raceSelectedAction$ = this.raceSelectedSubject.asObservable();

  dataSource = new MatTableDataSource();

  resultsDrivers$ = this.yearSelectedAction$.pipe(
    switchMap((selectedYear: number) => {
      return this.http.get<any>(`https://ergast.com/api/f1/${selectedYear}/qualifying.json`)
      .pipe(
        map(data => {
          const filterData = data.MRData?.RaceTable?.Races;
          // hardocding the 2 races
          filterData[0].QualifyingResults.forEach((data: any) => {
            data.name = `${data.Driver.familyName} ${data.Driver.givenName}`
          });
          filterData[1].QualifyingResults.forEach((data: any) => {
            data.name = `${data.Driver.familyName} ${data.Driver.givenName}`
          });
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
        this.dataSource.data = filterData;
        return this.dataSource;
        
      })
    )


  pageSizes = [10, 15, 25];

  onSelected(selectedYear: number): void {
    this.yearSelectedSubject.next(selectedYear);
  }

  onSelectedRace(selectedRace: number): void {
    this.raceSelectedSubject.next(selectedRace);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginatorPageSize;
  }

}
