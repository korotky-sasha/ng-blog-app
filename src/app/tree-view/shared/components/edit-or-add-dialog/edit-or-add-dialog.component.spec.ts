import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddDialogComponent } from './edit-or-add-dialog.component';

describe('EditOrAddDialogComponent', () => {
  let component: EditOrAddDialogComponent;
  let fixture: ComponentFixture<EditOrAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
