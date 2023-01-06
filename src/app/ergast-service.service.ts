import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, map, Observable, tap } from 'rxjs';
import { IDrivers, IMRDataResponse } from './interfaces/Formula1.interface';


@Injectable({
  providedIn: 'root'
})
export class ErgastServiceService {

  constructor(private http: HttpClient) { }

  drivers$: Observable<IDrivers[]> =
  this.http.get<IMRDataResponse>('https://ergast.com/api/f1/2018/drivers.json')
  .pipe(
    map(data => {
      return data.MRData.DriverTable.Drivers;
    })
  );
}
