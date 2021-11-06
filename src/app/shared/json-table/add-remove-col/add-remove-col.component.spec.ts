import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveColComponent } from './add-remove-col.component';

describe('AddRemoveColComponent', () => {
  let component: AddRemoveColComponent;
  let fixture: ComponentFixture<AddRemoveColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoveColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
