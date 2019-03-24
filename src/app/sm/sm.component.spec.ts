import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmComponent } from './sm.component';

describe('SmComponent', () => {
  let component: SmComponent;
  let fixture: ComponentFixture<SmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
