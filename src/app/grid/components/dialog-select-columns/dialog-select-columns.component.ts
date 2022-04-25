import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MultiSelectListBox } from '@grapecity/wijmo.input'; 

@Component({
  selector: 'app-dialog-select-columns',
  templateUrl: './dialog-select-columns.component.html',
  styleUrls: ['./dialog-select-columns.component.css']
})
export class DialogSelectColumnsComponent {
  @ViewChild('columnsBox', { static: true }) columnsBox: MultiSelectListBox;
  @Input() columns: any[];
  @Input() onChange: (columns: {binding: string, visible: boolean}[]) => void;

  private _sourceChanged = true;
  localColumns: any[] = [];
  error = false;
  private lastCheckedIndex: number;

  constructor() { 
  }

  ngOnInit(): void {
    this.localColumns = this.columns;
  }

  selectedItemsChanged(): void {
    const checkedCount = this.localColumns.reduce((acc, cur) => {
      if (cur.selected) {
        acc++;
      }
      return acc;
    }, 0);
    if (checkedCount) {
      if (this.error) {
        setTimeout(() => {
          this.error = false;
        }, 2000);
      }
      if (checkedCount === 1) {
        this.lastCheckedIndex = this.localColumns.findIndex(item => item.selected);
      }
      const columns = this.localColumns.map(item => ({
        binding: item.binding, visible: item.selected
      }));
      this.onChange(columns);
    } else {
      this.error = true;
      this.columnsBox.listBox.setItemChecked(this.lastCheckedIndex, true);
    }
  }
 
}
