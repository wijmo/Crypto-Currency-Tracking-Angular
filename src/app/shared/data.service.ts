import {Injectable, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';

import * as humps from 'humps';

import {initialColumns} from './initialColumns';
import {PortfoliosService, ViewMode} from './portfolios.service';
import generateTradingData from './utils/generateTradingData';

/**
 * Grid data service
 */
@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  allColumns = {...initialColumns};

  private selectedViewMode: ViewMode;
  private selectedViewModeSubscription: Subscription;
  private selectedPortfolioSubscription: Subscription;
  private selectedPortfolio;
  allSymbols: string[];

  tickers: any[];
  trading: any[];
  viewColumns$: Subject<any[]> = new BehaviorSubject<any[]>([]);
  trading$: Subject<any[]> = new BehaviorSubject<any[]>([]);
  filter$: Subject<string> = new BehaviorSubject<string>('');
  filteredData: any[];

  private timeoutId = 0;

  detailChartRange: {axisMin: number, axisMax: number} | null = null;

  constructor(private http: HttpClient, public portfoliosService: PortfoliosService) {
    this.selectedViewModeSubscription = portfoliosService.selectedViewMode$.subscribe(mode => {
      this.selectedViewMode = mode;
      this.updateViewColumns();
    });
    this.selectedPortfolioSubscription = portfoliosService.selectedPortfolio$.subscribe(portfolio => {
      this.selectedPortfolio = portfolio;
      this.detailChartRange = null; // discard expanded detail row
      this.requestTradingData();
    });
  }

  ngOnDestroy(): void {
    this.selectedViewModeSubscription.unsubscribe();
    this.selectedPortfolioSubscription.unsubscribe();
  }

  requestTradingData(): void {
    if (this.timeoutId) {
      return;
    }
    const delay = 500;
    this.timeoutId = setTimeout(() => this.mockRequestTradingData(), delay);
  }

  private mockRequestTradingData(): void {
    this.timeoutId = 0;
    this.http.get<any[]>('./assets/coinmarketcap-top20.json').subscribe(data => {
      this.tickers = humps.camelizeKeys(data);
      if (this.allSymbols === undefined) {
        this.allSymbols = this.tickers.map(ticker => ticker.symbol);
      }
      const newTrading = generateTradingData(this.selectedPortfolio.symbols, this.tickers, this.trading);
      this.trading = newTrading;
      this.trading$.next(newTrading);
    });
  }

  private updateViewColumns() {
    this.viewColumns$.next(this.allColumns[this.selectedViewMode]);
  }

  changeColumnVisibility(binding: string, visible: boolean): void {
    const columns: any[] = this.allColumns[this.selectedViewMode];
    const column = columns.find(col => col.binding === binding);
    if (column) {
      column.visible = visible;
      this.updateViewColumns();
    }
  }

  changeColumnsVisibility(columns: {binding: string, visible: boolean}[]): void {
    const allColumns: any[] = this.allColumns[this.selectedViewMode];
    columns.forEach(item => {
      const column = allColumns.find(col => col.binding === item.binding);
      if (column) {
        column.visible = item.visible;
      }
    });
    this.updateViewColumns();
  }

  setFilter(filter: string): void {
    this.detailChartRange = null; // discard expanded detail row
    this.filter$.next(filter);
  }

}
