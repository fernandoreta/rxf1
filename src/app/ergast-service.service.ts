import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErgastServiceService {

  constructor(private http: HttpClient) { }

  data2021$: Observable<I2021> = 
    this.http.get<any>('https://ergast.com/api/f1/2021/status.json')
    .pipe(
      map(fetchData => {
        const data: I2021 = {
          finishedCars: fetchData.MRData.StatusTable.Status[0].count,
          accident: fetchData.MRData.StatusTable.Status[2].count,
          plusOneLap: fetchData.MRData.StatusTable.Status[10].count
        };
        return data;
      })
    );
}

export interface I2021 {
  finishedCars: string;
  accident: string;
  plusOneLap: string;
}
