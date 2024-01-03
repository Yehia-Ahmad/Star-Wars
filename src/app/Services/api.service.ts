import { CharacterListService } from 'src/app/Services/character-list.service';
import { Observable } from 'rxjs';
import { APIResponse } from '../models';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(
    private http: HttpClient,
    private characterList: CharacterListService
  ) {}

  getCharacterList(pageNum?: string, url?: string): Observable<APIResponse> {
    if (pageNum) {
      const params = new HttpParams().set('page', pageNum);
      if (url) {
        if (url.includes('search')) {
          let term = this.characterList.searchTerm.value;
          return this.http.get<APIResponse>(
            `${env.BASE_URL}people/?search=${term}&page=${pageNum}`
          );
        } else {
          return this.http.get<APIResponse>(`${env.BASE_URL}people`, {
            params: params,
          });
        }
      }
    }
    return this.http.get<APIResponse>(`${env.BASE_URL}people`);
  }

  searchCharacter(term: string): Observable<APIResponse> {
    term = term.trim();
    const params = new HttpParams().set('search', term);
    return this.http.get<APIResponse>(`${env.BASE_URL}people`, {
      params: params,
    });
  }
}
