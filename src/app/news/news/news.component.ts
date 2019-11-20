import { Component, OnInit } from '@angular/core';

import { Report } from '../../shared/models/report';

import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  news: Report[];
  news$ = this.newsService.getReports();

  activeReportIndex = 0;
  activeReportId;

  constructor(
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.news$.subscribe(value => this.news = value);
  }

  selectReport(id, index) {
    this.activeReportIndex = index;
    this.activeReportId = id;
  }
}
