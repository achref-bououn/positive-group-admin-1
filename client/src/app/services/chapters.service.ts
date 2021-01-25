import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chapter } from '../models/chapter.model';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {

  requestOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
    }),
  };

  constructor(private http: HttpClient) { }

  getChapters(): Observable<any> {
    return this.http.get("/api/chapters", this.requestOptions)
  }

  addChapter(chapter: Chapter): Observable<any> {
    return this.http.post("/api/chapters", chapter, this.requestOptions)
  }

  editChapter(chapter: Chapter): Observable<any> {
    return this.http.put(`api/chapters/${chapter._id}`, chapter, this.requestOptions)
  }

  deleteChapter(chapterId): Observable<any> {
    return this.http.delete(`api/chapters/${chapterId}`, this.requestOptions)
  }

}
