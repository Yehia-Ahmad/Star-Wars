import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterListService {
  newList = new BehaviorSubject({});
  searchTerm = new BehaviorSubject('');
  pageNum = new BehaviorSubject(1);

  constructor() {}
}
