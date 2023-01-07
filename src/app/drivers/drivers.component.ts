import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, switchMap } from 'rxjs';
import { ErgastServiceService } from '../ergast-service.service';
import { IMRDataResponse } from '../interfaces/Formula1.interface';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriversComponent implements AfterViewInit  {

  constructor(private ergastService: ErgastServiceService, private http: HttpClient) {}

  showFirstLastButtons = true;
  
  error = 'No Data, Some problem occurred';
  showError = false;
  seasons = [ 2018, 2019, 2020, 2021, 2022 ];
  
  private yearSelectedSubject = new BehaviorSubject<number>(this.seasons[0]);
  yearSelectedAction$ = this.yearSelectedSubject.asObservable();
  selectedDrivers$ = this.yearSelectedAction$.pipe(
    switchMap(selectedYear => {
      return this.http.get<IMRDataResponse>(`https://ergast.com/api/f1/${selectedYear}/drivers.json`)
      .pipe(
        map(data => {
          return data?.MRData?.DriverTable?.Drivers;
        })
      )
    }),
    catchError(err => {
      console.log(err);
      this.error = err;
      this.showError = true;
      return EMPTY;
  }));

  pageSizes = [10, 15, 25];

  onSelected(selectedYear: number): void {
    this.yearSelectedSubject.next(selectedYear);
  }

  ngAfterViewInit() {
    
  }

}
