import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export const VIEW_MODES = ['OVERVIEW', 'TECHNICAL', 'PERFORMANCE'];
export type ViewMode = typeof VIEW_MODES[number];

export interface Portfolio {
  name: string;
  symbols: string[];
}

/**
 * Portfolios service
 */
@Injectable({
  providedIn: 'root'
})
export class PortfoliosService {
  private list = [
    {
      name: 'Holdings',
      symbols: [
        'BTC',
        'ETH',
        'XRP',
        'BCH',
        'LTC',
        'ADA',
        'NEO',
        'XLM',
        'EOS',
        'XMR',
        'DASH',
        'XEM',
      ],
    },
    {name: 'Watching', symbols: []},
  ];
  selectedPortfolioName: string;
  private selectedPortfolio: any;
  selectedViewMode$: Subject<ViewMode> = new BehaviorSubject<ViewMode>('OVERVIEW');
  selectedPortfolio$: Subject<Portfolio> = new BehaviorSubject<Portfolio>(null);
  portfolios$: Subject<Portfolio[]> = new BehaviorSubject<Portfolio[]>(this.list);

  constructor() {
    this.selectPortfolio(this.list[0].name);
  }

  getList(): Portfolio[] {
    return this.list;
  }

  addPortfolio(name: string): void {
    const newPortfolio: Portfolio = {name, symbols: []};
    this.list = [...this.list, newPortfolio];
    this.portfolios$.next(this.list);
    this.selectedPortfolio = newPortfolio;
    this.selectedPortfolio$.next(newPortfolio);
  }

  deletePortfolio(name: string): void {
    const updateSelected = name === this.selectedPortfolio.name;
    this.list = this.list.filter(portfolio => portfolio.name !== name);
    this.portfolios$.next(this.list);
    if (this.list.length > 0) {
      if (updateSelected) {
        this.selectPortfolio(this.list[0].name);
      }
    } else {
      this.selectedPortfolio = null;
    }
    if (!(this.list.length > 0 && updateSelected)) {
      this.selectedPortfolio$.next(this.selectedPortfolio);
    }
  }

  selectPortfolio(name: string): void {
    this.selectedPortfolioName = name;
    const selectedPortfolio = this.list.find(entry => entry.name === this.selectedPortfolioName);
    if (selectedPortfolio) {
      this.selectedPortfolio = selectedPortfolio;
      this.selectedPortfolio$.next(selectedPortfolio);
    }
  }

  selectViewMode(mode: ViewMode): void {
    this.selectedViewMode$.next(mode);
  }

  updatePortfolioSymbols(symbols: string[]): void {
    this.selectedPortfolio.symbols = symbols;
    this.selectedPortfolio$.next(this.selectedPortfolio);
  }

}





