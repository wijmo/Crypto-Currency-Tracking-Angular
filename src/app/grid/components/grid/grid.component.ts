import {
  Component,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver, Injector
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Globalize } from '@grapecity/wijmo';
import {WjFlexGridDetail} from '@grapecity/wijmo.angular2.grid.detail';
import {FormatItemEventArgs} from '@grapecity/wijmo.grid';


import * as wjcGrid from '@grapecity/wijmo.grid';
import * as wjcGridDetail from '@grapecity/wijmo.grid.detail';

import {DataService} from '../../../shared/data.service';
import {AppService, Settings} from '../../../shared/app.service';
import {formatCell} from '../../../shared/utils/wjUtils';
import {DetailPanelComponent} from '../detail-panel/detail-panel.component';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Pipe blocking DOMSanitizer for trusted HTML content
 */
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

/**
 * Data grid component
 */
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnDestroy {
  // references FlexGrid named 'flex' in the view
  @ViewChild('flex', { static: true }) flex: wjcGrid.FlexGrid;

  // references WjFlexGridDetail named 'detail' in the view
  @ViewChild('detail') detail: WjFlexGridDetail;

  private requestClearCells = false; // request clear cell elements on next formatItem
  private cellElements = {}; // stored cell elements

  private detailPanel: DetailPanelComponent;
  private detailItemId: string;

  viewColumns: any[];
  trading: any[];
  sourceData: any[];
  filter = '';

  settings: Settings;
  private settingsSubscription: Subscription;
  private viewColumnsSubscription: Subscription;
  private tradingSubscription: Subscription;
  private filterSubscription: Subscription;

  constructor(public dataService: DataService,
              private appService: AppService,
              // tslint:disable-next-line:variable-name
              private _viewContainerRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver,
              private injector: Injector) {
    this.viewColumnsSubscription = this.dataService.viewColumns$.subscribe(columns =>
      this.viewColumns = columns.filter(column => column.visible));
    this.tradingSubscription = this.dataService.trading$.subscribe(data => {
      this.trading = data;
      this.prepareSourceData();
    });
    this.settingsSubscription = appService.settings$.subscribe(settings => {
      const initial = this.settings === undefined;
      this.settings = settings;
      if (!initial) {
         this.customizeFlexGrid(this.flex);
         this.flex.refresh(false);
      }
    });
    this.filterSubscription = dataService.filter$.subscribe(filter => {
      this.filter = filter;
      this.prepareSourceData();
    });
  }

  ngOnDestroy(): void {
    this.viewColumnsSubscription.unsubscribe();
    this.tradingSubscription.unsubscribe();
    this.settingsSubscription.unsubscribe();
  }

  private prepareSourceData(): void {
    if (this.trading === undefined) {
      return;
    }

    const filteredData = this.filter.length > 0
      // IE11
      ? this.trading.filter(entry => `${entry.name}`.toLowerCase().indexOf(this.filter) > -1)
      : this.trading;

    if (this.sourceData === undefined) {
      this.sourceData = filteredData;
      return;
    }

    // Store "soft refreshed" data to data store
    this.dataService.filteredData = filteredData;

    const isChangedSymbolsList =
      JSON.stringify(this.sourceData.map(item => item.id).sort()) !== JSON.stringify(filteredData.map(item => item.id).sort());
    if (isChangedSymbolsList) {
      this.sourceData = filteredData;
      return;
    }

    if (this.detailItemId) {
      this.detailPanel.item = this.getDetailItem();
    }

    if (this.flex) {
      this.flex.refresh(false);
    }
  }

  /**
   * Occurs after the grid have been initialized.
   * @arg flexgrid - GridPanel that contains the range.
   */
  handleInitialized(flexgrid: wjcGrid.FlexGrid) {
    this.customizeFlexGrid(flexgrid);
  }

  // Extra FlexGrid settings:
  private customizeFlexGrid(flexgrid: wjcGrid.FlexGrid): void {
    flexgrid.rows.defaultSize = this.settings.rowHeight;
    flexgrid.columnHeaders.rows.defaultSize = this.settings.headersRowHeight;
  }

  /**
   * wjFlexGridDetail directive initialized
   * @param detail WjFlexGridDetail instance reference
   */
  detailInitialized(detail): void {
    const baseCreateDetailCell = this.detail.createDetailCell;

    // wjFlexGridDetail createDetailCell() custom wrapper
    this.detail.createDetailCell = (row: wjcGrid.Row, col: wjcGrid.Column) => {
      // save grid's row expanded manually
      this.detailItemId = row.dataItem.id;
      return baseCreateDetailCell(row, col);
    };

    const baseDisposeDetailCell = this.detail.disposeDetailCell;

    // wjFlexGridDetail disposeDetailCell() custom wrapper
    this.detail.disposeDetailCell = (row: wjcGridDetail.DetailRow) => {
      // detail cell collapsed manually
      this.detailItemId = undefined;

      return baseDisposeDetailCell(row);
    };
  }

  /**
   * DetailPanelComponent initialized Event handler
   * @param event instance of the DetailPanelComponent
   */
  detailPanelInitialized(event): void {
    this.detailPanel = event;
    this.detailPanel.item = this.getDetailItem();
  }

  /**
   * Get the data item for the detail panel
   * @private
   */
  private getDetailItem(): any {
    let item: any = null;
    if (this.detailItemId) {
      item = this.trading.find((elem => (elem.id === this.detailItemId)));
    }
    return item;
  }

  formatCustomCell(dataItem, col, flare= true) {
    return `${formatCell(dataItem, col, flare)}`;
  }

  /**
   * Occurs when an element representing a cell has been created.
   * @arg flexgrid - GridPanel that contains the range.
   * @arg event - Format Item Event Context.
   */
    // handleFormatItem = (flexgrid: wjcGrid.FlexGrid, cellRange) => {
  handleFormatItem = (flexgrid: wjcGrid.FlexGrid, event: FormatItemEventArgs) => {
    const {rows, columns, cells} = flexgrid;
    const {cell, panel} = event;
    const {col, row} = event.range;
    const itemsSource = this.trading;

    if (cells === panel) {
      const column = columns[col];
      const rowDataItem = rows[row].dataItem || {};
      const symbol = rowDataItem.symbol || null;
      const dataItem = itemsSource.find(entry => symbol === entry.symbol);

      // clear cell elements
      if (this.requestClearCells) {
        this.cellElements = {};
        this.requestClearCells = false;
      }
      if (dataItem) {
        // create stored cell element (if it is needed)
        if (!this.cellElements[symbol]) this.cellElements[symbol] = {};
        this.cellElements[symbol][column.binding] = cell; // store cell element
        this.handleFormatCell(cell, dataItem, column, this.settings.isCustomCells); // custom painting
      }
    }
  }

  /**
   * Customize cell appearance.
   */
  handleFormatCell = (cell, dataItem, col, isCustomPaint, flare = true) => {
    // eslint-disable-next-line
    cell.innerHTML = isCustomPaint
      ? `<div>${formatCell(dataItem, col, flare)}</div>`
      : `<div>${Globalize.format(dataItem[col.binding], col.format)}</div>`;
  }

}
