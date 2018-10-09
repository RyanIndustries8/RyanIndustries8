import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdcogComponent } from './mdcog.component';

describe('MdcogComponent', () => {
  let component: MdcogComponent;
  let fixture: ComponentFixture<MdcogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdcogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdcogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
