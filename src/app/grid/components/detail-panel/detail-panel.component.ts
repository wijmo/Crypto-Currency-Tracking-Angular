import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Globalize } from '@grapecity/wijmo';

/**
 * Detail panel for data grid component
 */
@Component({
  selector: 'app-detail-panel',
  templateUrl: './detail-panel.component.html',
  styleUrls: ['./detail-panel.component.css']
})
export class DetailPanelComponent implements OnInit {
  isRising: boolean;
  icon: string;
  headlineClasses: string;
  difference: string;
  itemSummaryData: any[];
  displayedSummaryColumns: string[] = ['name', 'value'];
  id: string;

  constructor() { }

  /**
   * This event is triggered after the component has been initialized by Angular
   */
  @Output() initialized = new EventEmitter<DetailPanelComponent>();

  @Input()
  get row(): any {
    return this._row;
  }
  set row(val: any) {
    this._row = val;
    this.id = val.dataItem.id;
    this.item = val.dataItem;
  }
  // tslint:disable-next-line:variable-name
  private _row: any;

  @Input()
  get item(): any {
    return this._item;
  }
  set item(val: any) {
    this._item = val;
    this.isRising = val.close > val.open;
    this.icon = this.isRising ? 'arrow_upward' : 'arrow_downward';
    this.headlineClasses = `headline ${this.isRising ? 'headline_increased' : ''}`;
    this.difference = (this.isRising ? '+' : '-') + (val.close - val.open).toFixed(2);

    const priceHistory = val.history.map(el => el.close);
    const rangeMin = Math.min(...priceHistory).toFixed(2);
    const rangeMax = Math.max(...priceHistory).toFixed(2);

    this.itemSummaryData = [
      {name: 'Time', value: Globalize.format(val.time, 'hh:mm:ss')},
      {name: 'Volume', value: val.volume.toFixed(2)},
      {name: 'Open', value: val.open.toFixed(2)},
      {name: 'Close', value: val.close.toFixed(2)},
      {name: 'Prev. Open', value: val.history[0].open.toFixed(2)},
      {name: 'Prev. Close', value: val.history[0].close.toFixed(2)},
      {name: '1-Year Change', value: `${val.performanceYear.toFixed(2)}%`},
      {name: 'Range', value: `${rangeMin} - ${rangeMax}`},

    ];
  }
  // tslint:disable-next-line:variable-name
  private _item: any;

  ngOnInit(): void {
    this.initialized.emit(this);
  }
}
