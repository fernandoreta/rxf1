import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ErgastServiceService, I2021 } from '../ergast-service.service';

@Component({
  selector: 'app-bonus',
  templateUrl: './bonus.component.html',
  styleUrls: ['./bonus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BonusComponent {

  constructor(private ergService: ErgastServiceService) {}

  data$: Observable<I2021> | undefined = this.ergService.data2021$;

}
