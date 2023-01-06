import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErgastServiceService {

  constructor(private http: HttpClient) { }

  getDrivers() {
    return this.http.get('https://ergast.com/api/f1/2018/drivers.json')
    // .pipe(
    //   tap(data => console.log(data)),
    //   catchError(err => {
    //     console.log(err);
    //     return EMPTY;
    //   })
    // );
  }
}
