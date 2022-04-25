import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSymbolComponent } from './dialog-add-symbol.component';

describe('DialogAddSymbol2Component', () => {
  let component: DialogAddSymbolComponent;
  let fixture: ComponentFixture<DialogAddSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddSymbolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
