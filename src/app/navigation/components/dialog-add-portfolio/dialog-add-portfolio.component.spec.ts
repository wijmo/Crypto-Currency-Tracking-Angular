import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPortfolioComponent } from './dialog-add-portfolio.component';

describe('DialogAddPortfolio2Component', () => {
  let component: DialogAddPortfolioComponent;
  let fixture: ComponentFixture<DialogAddPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
