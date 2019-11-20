import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news/news.component';
import { ReportPreviewComponent } from './report-preview/report-preview.component';

import { NewsService } from './services/news.service';
import { ReportDetailComponent } from './report-detail/report-detail.component';


@NgModule({
  declarations: [NewsComponent, ReportPreviewComponent, ReportDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    NewsRoutingModule
  ],
  providers: [
    NewsService
  ]
})
export class NewsModule { }
