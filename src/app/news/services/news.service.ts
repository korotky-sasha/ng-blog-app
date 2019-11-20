import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Report } from '../../shared/models/report';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    private http: HttpClient
  ) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`/news` );
  }

  getReport(id): Observable<Report> {
    return this.http.get<Report>(`/news/${id}` );
  }

  deleteReport(id): Observable<Report> {
    return this.http.delete<Report>(`/news/${id}`);
  }

  addReport(post): Observable<Report> {
    return this.http.post<Report>(`/news`, post);
  }

  updateReport(id, post): Observable<Report> {
    return this.http.put<Report>(`/news/${id}`, post);
  }
}
