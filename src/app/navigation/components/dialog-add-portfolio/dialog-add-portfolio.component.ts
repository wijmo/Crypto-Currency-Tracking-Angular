import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-add-portfolio',
  templateUrl: './dialog-add-portfolio.component.html',
  styleUrls: ['./dialog-add-portfolio.component.css']
})
export class DialogAddPortfolioComponent {
/*
  static config = {
    panelClass: 'dialog-add-portfolio2',
  //  maxWidth: '600px',
  };
*/

  @Input() usedNames: string[];
  @Input() selectedPortfolioName: string;
  @Input() onSave: (portfolioName?: string) => void;

  portfolioName = '';
  error = false;

  constructor() { }

  onInput(event): void {
    this.portfolioName = event.target.value.trim();
    this.error = this.portfolioName.length > 0 && this.usedNames.indexOf(this.portfolioName) > -1;
  }

  save():void {
    this.onSave(this.portfolioName);
    this.portfolioName = '';
  }
  cancel(): void {
    this.onSave();
    this.portfolioName = '';
  }

}
