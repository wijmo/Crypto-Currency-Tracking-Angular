import { Component, Input, ViewChild } from '@angular/core';
import { MultiAutoComplete } from '@grapecity/wijmo.input';

@Component({
  selector: 'app-dialog-add-symbol',
  templateUrl: './dialog-add-symbol.component.html',
  styleUrls: ['./dialog-add-symbol.component.css'],
})
export class DialogAddSymbolComponent {
  @ViewChild('symbolsList', { static: true }) symbolsList: MultiAutoComplete;
  @Input() 
  set allSymbols(val: string[]) {
    if (val) {
      this._allSymbols = val;
      this.refresh();
    }
  };
  private _allSymbols: string[];

  @Input() 
  set selectedSymbols(val: string[]) {
    this._selectedSymbols = [...val];
  }
  _selectedSymbols: string[] = [];

  @Input() onSave: (symbols?: string[]) => void;

  availableSymbols: string[];
  availableSymbolsList: string;

  constructor() { }

  refresh(): void {
    if (this._allSymbols) {
      this.availableSymbols = this._allSymbols.filter((symbol: string) => 
        this._selectedSymbols.indexOf(symbol) == -1
      );
      this.availableSymbolsList = this.availableSymbols.join(', ');
    }
  }

  save(): void {
    this.onSave(this._selectedSymbols);
  }
  cancel(): void {
    this.onSave();
  }

  selectedItemsChanged(): void {
    if (this._selectedSymbols.length == 0) {
      this._selectedSymbols = this.symbolsList.selectedItems;
    }
    this.refresh();
  }
}
