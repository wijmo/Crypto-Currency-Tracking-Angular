import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectColumnsComponent } from './dialog-select-columns.component';

describe('DialogSelectColumnsComponent', () => {
  let component: DialogSelectColumnsComponent;
  let fixture: ComponentFixture<DialogSelectColumnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectColumnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSelectColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
