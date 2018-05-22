import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CapPaginationComponent } from "./cap-pagination.component";

describe("CapPaginationComponent", () => {
  let component: CapPaginationComponent;
  let fixture: ComponentFixture<CapPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CapPaginationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
