import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CapGridPaginationComponent } from './cap-grid-pagination.component';

describe('CapGridPaginationComponent', () => {
  let component: CapGridPaginationComponent;
  let fixture: ComponentFixture<CapGridPaginationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CapGridPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapGridPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
