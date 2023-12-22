import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSideComponent } from './result-side.component';

describe('ResultSideComponent', () => {
  let component: ResultSideComponent;
  let fixture: ComponentFixture<ResultSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultSideComponent]
    });
    fixture = TestBed.createComponent(ResultSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
