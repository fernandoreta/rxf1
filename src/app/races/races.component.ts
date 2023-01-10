import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, catchError, EMPTY, map, switchMap } from 'rxjs';
import { ErgastServiceService } from '../ergast-service.service';
import { IMRDataResponse } from '../interfaces/Formula1.interface';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RacesComponent implements AfterViewInit {

  constructor(private http: HttpClient) {}

  seasons = [ 2018, 2019, 2020, 2021, 2022 ];

  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild('paginator') paginator!: MatPaginator;

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = [
    'grid',
    'laps',
    'number',
    'points',
    'position',
    'positionText',
    'status',
    'name'
  ];
  
  private yearSelectedSubject = new BehaviorSubject<number>(this.seasons[0]);
  yearSelectedAction$ = this.yearSelectedSubject.asObservable();
  races$ = this.yearSelectedAction$.pipe(
    switchMap((selectedYear: number) => {
      return this.http.get<any>(`https://ergast.com/api/f1/${selectedYear}/last/results.json`)
      .pipe(
        map(data => {
          const filterData = data.MRData?.RaceTable?.Races[0]?.Results;
          filterData.forEach((data: any) => {
            data.name = `${data.Driver.familyName} ${data.Driver.givenName}`
          });
          this.dataSource.data = filterData;
          return this.dataSource;
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginatorPageSize;
  }

}
