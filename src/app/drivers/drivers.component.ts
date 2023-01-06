import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { ErgastServiceService } from '../ergast-service.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriversComponent implements AfterViewInit  {

  constructor(private ergastService: ErgastServiceService) {}

  showFirstLastButtons = true;

  drivers$ = this.ergastService.drivers$;

  seasons = [ 2018, 2019, 2020, 2021, 2022 ];

  pageSizes = [10, 15, 25];

  onSelected(season: string): void {
    console.log(season);
  }

  ngAfterViewInit() {
    
  }

}
