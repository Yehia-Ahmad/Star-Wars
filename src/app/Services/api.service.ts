import { Observable } from 'rxjs';
import { APIResponse } from '../Models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  getCharacterList(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${env.BASE_URL}people`);
  }

  getNewPage(pageNum: string): Observable<APIResponse> {
    const params = new HttpParams().set('page', pageNum);
    return this.http.get<APIResponse>(`${env.BASE_URL}people`, {
      params: params,
    });
  }

  searchCharacter(term: string): Observable<APIResponse> {
    term = term.trim();
    const params = new HttpParams().set('search', term);
    return this.http.get<APIResponse>(`${env.BASE_URL}people`, {
      params: params,
    });
  }
}
