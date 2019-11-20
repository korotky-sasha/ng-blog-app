import { Component, Input } from '@angular/core';

import {Report} from '../../shared/models/report';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent {
  @Input() report: Report;

  constructor() { }

}
