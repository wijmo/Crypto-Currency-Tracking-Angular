import { Component, Input, OnDestroy, Inject, ViewChild } from '@angular/core';
import * as wjcGrid from '@grapecity/wijmo.grid';
import * as input from '@grapecity/wijmo.input';

import { Subscription } from 'rxjs';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCheckboxChange} from '@angular/material/checkbox';

import {DataService} from '../../../shared/data.service';
import {PortfoliosService} from '../../../shared/portfolios.service';
import {print, pdf} from '../../../shared/utils/wjUtils';

import { DialogAddSymbolComponent } from '../dialog-add-symbol/dialog-add-symbol.component';
import { DialogSelectColumnsComponent } from '../dialog-select-columns/dialog-select-columns.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnDestroy {
  @Input() flexGrid: wjcGrid.FlexGrid;
  @ViewChild('frmSymbols', { static: true }) frmSymbols: input.Popup;
  @ViewChild('frmColumns', { static: true }) frmColumns: input.Popup;


  viewColumns: any[];
  columns: any[];
  private viewColumnsSubscription: Subscription;
  private selectedPortfolioSubscription: Subscription;
  selectedPortfolio;
  allSymbols: string[];
  selectedSymbols: string[] = [];

  constructor(public dataService: DataService, public portfoliosService: PortfoliosService, public dialog: MatDialog) {
    this.viewColumnsSubscription = dataService.viewColumns$.subscribe(columns =>
      {
        this.viewColumns = columns.map(column => (
          {binding: column.binding, selected: column.visible, header: column.header}));
        this.columns = this.viewColumns.filter(column => Boolean(column.binding));
      });
    this.selectedPortfolioSubscription = portfoliosService.selectedPortfolio$.subscribe(portfolio => {
      this.selectedPortfolio = portfolio;
    });
  }

  ngOnDestroy(): void {
    this.viewColumnsSubscription.unsubscribe();
  }

  columnSelectionChanged = (binding: string, checked: boolean) => {
    this.dataService.changeColumnVisibility(binding, checked);
  }

  // Event Handlers
  handleAddSymbol = () => {
    this.allSymbols = this.dataService.allSymbols;
    this.selectedSymbols = [...this.selectedPortfolio.symbols];
    this.frmSymbols.show(true);
  }
   handleSaveSymbols = (symbols?: string[]): void => {
    if (symbols) {
      this.portfoliosService.updatePortfolioSymbols(symbols);
    }
    this.frmSymbols.hide();
  }
  handleSelectColumns = () => {
    this.frmColumns.show(true);
  }
  handleColumnsChange = (columns: {binding: string, visible: boolean}[]) => {
    this.dataService.changeColumnsVisibility(columns);
  }
  handleRefresh = () => {
    this.dataService.requestTradingData();
  }
  handlePrint = () => {
    // send "soft refreshed" data to print() method
    print(this.flexGrid, this.dataService.filteredData);
  }
  handleDownload = () => {
    // send "soft refreshed" data to pdf() method
    pdf(this.flexGrid, this.dataService.filteredData);
  }

}
