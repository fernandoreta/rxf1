import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, catchError, EMPTY, map, switchMap } from 'rxjs';
import { IMRDataResponse } from '../interfaces/Formula1.interface';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StandingsComponent implements AfterViewInit {

  constructor(private http: HttpClient) {}

  dataSource = new MatTableDataSource();
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  @ViewChild('paginator') paginator!: MatPaginator;

  seasons = [ 2018, 2019, 2020, 2021, 2022 ];

  displayedColumns: string[] = [
    'position',
    'points',
    'wins',
    'name'
  ];
  
  private yearSelectedSubject = new BehaviorSubject<number>(this.seasons[0]);
  yearSelectedAction$ = this.yearSelectedSubject.asObservable();
  standings$ = this.yearSelectedAction$.pipe(
    switchMap((selectedYear: number) => {
      return this.http.get<any>(`http://ergast.com/api/f1/${selectedYear}/driverStandings.json`)
      .pipe(
        map(data => {
          const filterData = data.MRData?.StandingsTable?.StandingsLists[0].DriverStandings;
          filterData.forEach((data: any) => {
            data.name = `${data.Driver.familyName} ${data.Driver.givenName}`
          });
          this.dataSource.data = filterData;
          return this.dataSource;
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginatorPageSize;
  }

}
