import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as wjcGrid from '@grapecity/wijmo.grid';

import {DataService} from '../../../shared/data.service';
import {AppService, Settings} from '../../../shared/app.service';
import {Subscription} from 'rxjs';
import {GridComponent} from '../grid/grid.component';

/**
 * Main data grid panel component
 */
@Component({
  selector: 'app-grid-main',
  templateUrl: './grid-main.component.html',
  styleUrls: ['./grid-main.component.css']
})
export class GridMainComponent implements OnInit, OnDestroy {
  private settingsSubscription: Subscription;
  private settings: Settings;
  private requestTradingDataInterval: number;
  private updateInterval = 0;

  @ViewChild('gridComponent', { static: true }) gridComponent: GridComponent;
  flexGrid: wjcGrid.FlexGrid;

  constructor(private appService: AppService, private dataService: DataService) {
    this.settingsSubscription = appService.settings$.subscribe(settings => {
      this.settings = settings;
      this.autoUpdateTradingData();
    });
  }

  ngOnInit(): void {
    this.dataService.requestTradingData();
    this.flexGrid = this.gridComponent.flex;
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
    if (this.updateInterval) {
      clearInterval(this.requestTradingDataInterval);
    }
  }

  private autoUpdateTradingData(): void {
    if (this.updateInterval && (this.updateInterval !== this.settings.updateInterval || !this.settings.isAutoUpdate)) {
      clearInterval(this.requestTradingDataInterval);
      this.updateInterval = 0;
    }
    if (this.settings.isAutoUpdate) {
      if (this.updateInterval !== this.settings.updateInterval) {
        this.requestTradingDataInterval = setInterval(() => {
          this.dataService.requestTradingData();
         }, this.settings.updateInterval * 1000);
        this.updateInterval = this.settings.updateInterval;
      }
    }
  }

}
