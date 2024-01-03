import { TestBed } from '@angular/core/testing';

import { CharacterListService } from './character-list.service';

describe('CharacterListService', () => {
  let service: CharacterListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
