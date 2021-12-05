import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaOverviewGraphComponent } from './area-overview-graph.component';

describe('AreaOverviewGraphComponent', () => {
  let component: AreaOverviewGraphComponent;
  let fixture: ComponentFixture<AreaOverviewGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaOverviewGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaOverviewGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
