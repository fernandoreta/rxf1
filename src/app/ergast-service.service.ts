import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, combineLatest, EMPTY, forkJoin, map, Observable, shareReplay, switchMap, tap, zip } from 'rxjs';
import { IDrivers, IMRDataResponse } from './interfaces/Formula1.interface';
import { ActivatedRoute, Route } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ErgastServiceService {

  constructor(private http: HttpClient) { }
  
}
