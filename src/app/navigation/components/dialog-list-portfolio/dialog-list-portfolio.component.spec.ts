import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListPortfolioComponent } from './dialog-list-portfolio.component';

describe('DialogListPortfolio2Component', () => {
  let component: DialogListPortfolioComponent;
  let fixture: ComponentFixture<DialogListPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogListPortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogListPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
