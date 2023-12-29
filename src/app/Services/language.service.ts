import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  lang = new BehaviorSubject('en');

  constructor() {}

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }
}
