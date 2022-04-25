import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dialog-list-portfolio',
  templateUrl: './dialog-list-portfolio.component.html',
  styleUrls: ['./dialog-list-portfolio.component.css']
})
export class DialogListPortfolioComponent {
  @Input() 
  get usedNames(): string[] {
    return this._usedNames;
  };
  set usedNames(val: string[]) {
    this._usedNames = this.filteredNames = val;
  }
  private _usedNames: string[];
  filteredNames: string[];
  @Input() selectedPortfolioName: string;
  @Input() onSelect: (portfolioName?: string) => void;
  @Input() onDelete: (portfolioName: string) => void;

  error = '';
  filter = '';

  constructor() { }

  onInput(event): void {
    this.filter = event.target.value.trim().toLowerCase();
    this.filteredNames = this.usedNames.filter(name => name.toLowerCase().indexOf(this.filter) > -1);
    if (this.filteredNames.length) {
      this.error = '';
    } else {
      this.error = 'No entries found containing: ' + this.filter;
    }
  }

  handleSelect(name: string): void {
    this.onSelect(name);
    this.selectedPortfolioName = name;
    this.error = '';
  }

  handleDelete(deletedName: string): void {
    if (this.usedNames.length === 1) {
      this.error = 'You can not delete the last portfolio';
    } else {
      this.onDelete(deletedName);
      this.usedNames = this.usedNames.filter(item => item !== deletedName);
      this.filteredNames = this.usedNames.filter(name => name.toLowerCase().indexOf(this.filter) > -1);
    }
  }

  close(): void {
    this.onSelect();
    this.filter = '';
    this.error = '';
  }

}
