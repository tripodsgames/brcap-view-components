import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapSelectMultComponent } from './cap-select-mult.component';

describe('CapSelectMultComponent', () => {
  let component: CapSelectMultComponent;
  let fixture: ComponentFixture<CapSelectMultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapSelectMultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapSelectMultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
