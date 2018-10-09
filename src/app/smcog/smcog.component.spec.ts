import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmcogComponent } from './smcog.component';

describe('SmcogComponent', () => {
  let component: SmcogComponent;
  let fixture: ComponentFixture<SmcogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmcogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmcogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
