import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchItemsService {
  newItems = new BehaviorSubject([]);

  constructor() {}
}
