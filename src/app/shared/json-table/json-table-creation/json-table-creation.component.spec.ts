import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonTableCreationComponent } from './json-table-creation.component';

describe('JsonTableCreationComponent', () => {
  let component: JsonTableCreationComponent;
  let fixture: ComponentFixture<JsonTableCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonTableCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonTableCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
