import { Observable } from 'rxjs';
import { APIResponse } from '../Models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  getCharacterList(): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${env.BASE_URL}people`);
  }

  getNextPage(nextPage: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${nextPage}`);
  }

  getPreviousPage(previousPage: string): Observable<APIResponse> {
    return this.http.get<APIResponse>(`${previousPage}`);
  }

  searchCharacter(term: string): Observable<APIResponse> {
    term = term.trim();
    return this.http.get<APIResponse>(`${env.BASE_URL}people/?search=${term}`);
  }
}
