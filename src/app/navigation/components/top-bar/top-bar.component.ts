import { Component, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';

import { WjTabPanel } from '@grapecity/wijmo.angular2.nav';

import {PortfoliosService, ViewMode, VIEW_MODES} from '../../../shared/portfolios.service';
import {assetsViewModes} from '../../navigation.types';
import {DataService} from '../../../shared/data.service';

/**
 * Secondary application menu bar component
 */
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnDestroy {
  VIEW_MODES = VIEW_MODES;
  selectedViewMode: ViewMode;
  private selectedViewModeSubscription: Subscription;
  filter = '';

  constructor(public portfoliosService: PortfoliosService, private dataService: DataService) {
    this.selectedViewModeSubscription = portfoliosService.selectedViewMode$.subscribe(mode => {
      this.selectedViewMode = mode;
    });
  }

  ngOnDestroy(): void {
    this.selectedViewModeSubscription.unsubscribe();
    this.selectedViewModeSubscription.unsubscribe();
  }

  selectTab(s: WjTabPanel) {
    this.portfoliosService.selectViewMode(s.selectedTab.header.textContent as ViewMode);
  }

  assetsViewModes(): string[] {
    return assetsViewModes();
  }

  changeFilter(value: string): void {
    this.dataService.setFilter(value);
    this.filter = value;
  }

  onChange(event): void {
    this.changeFilter(event.target.value.toLowerCase());
  }

}
