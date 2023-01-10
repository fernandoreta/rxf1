import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, catchError, EMPTY, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriversComponent implements AfterViewInit  {

  constructor(private http: HttpClient) {}

  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild('paginator') paginator!: MatPaginator;

  seasons = [ 2018, 2019, 2020, 2021, 2022 ];

  displayedColumns: string[] = [
    'code',
    'dateOfBirth',
    'driverId',
    'familyName',
    'givenName',
    'nationality',
    'permanentNumber',
    'url'
  ];

  dataSource = new MatTableDataSource();
  
  private yearSelectedSubject = new BehaviorSubject<number>(this.seasons[0]);
  yearSelectedAction$ = this.yearSelectedSubject.asObservable();
  selectedDrivers$ = this.yearSelectedAction$.pipe(
    switchMap(selectedYear => {
      return this.http.get<any>(`https://ergast.com/api/f1/${selectedYear}/drivers.json`)
      .pipe(
        map(data => {
          this.dataSource.data = data?.MRData?.DriverTable?.Drivers;
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginatorPageSize;
  }

}
