import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { socialmediaComponent } from './socialmedia.component';

describe('socialmediaComponent', () => {
  let component: socialmediaComponent;
  let fixture: ComponentFixture<socialmediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ socialmediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(socialmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
