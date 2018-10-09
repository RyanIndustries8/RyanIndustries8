import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgcogComponent } from './lgcog.component';

describe('LgcogComponent', () => {
  let component: LgcogComponent;
  let fixture: ComponentFixture<LgcogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgcogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgcogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
