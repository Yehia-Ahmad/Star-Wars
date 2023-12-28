import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDark = new BehaviorSubject(false);

  constructor() {}
  setItem(key: string, value: boolean) {
    localStorage.setItem(key, String(value));
  }

  getItem(key: string): boolean {
    return localStorage.getItem(key) === 'true';
  }
}
