import { Component, OnInit, Input } from '@angular/core';

import { Report } from '../../shared/models/report';

@Component({
  selector: 'app-report-preview',
  templateUrl: './report-preview.component.html',
  styleUrls: ['./report-preview.component.scss']
})
export class ReportPreviewComponent implements OnInit {
  @Input() report: Report;

  constructor() { }

  ngOnInit() {
  }

}
