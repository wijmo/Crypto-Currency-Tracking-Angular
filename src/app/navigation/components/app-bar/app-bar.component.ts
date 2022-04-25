import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { WjTabPanel } from '@grapecity/wijmo.angular2.nav';
import * as input from '@grapecity/wijmo.input';

import {AppService} from '../../../shared/app.service';
import {Portfolio, PortfoliosService} from '../../../shared/portfolios.service';

/**
 * Application menu bar component
 */
@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnDestroy {
  readonly mainActions = [
    { label: 'Add a portfolio', icon: 'add', handler: () => {
        this.handleOpenAddDialog2();
      }},
    { label: 'List portfolios', icon: 'menu', handler: () => {
        this.handleOpenListDialog2();
      }},
  ];
  readonly settingsAction = {
      label: 'Settings', icon: 'settings', handler: () => {
      this.handleOpenSettings();
    }};

  private portfoliosSubscription: Subscription;
  private selectedPortfolioSubscription: Subscription;

  portfolioIndex = 0;
  portfolios: Portfolio[];

  @ViewChild('frmAddPortfolio', { static: true }) frmAddPortfolio: input.Popup;
  @ViewChild('frmListPortfolio', { static: true }) frmListPortfolio: input.Popup;
  usedNames: string[];
  selectedPortfolioName: string;


  constructor(private appService: AppService,
              private portfoliosService: PortfoliosService,
              public dialog: MatDialog) {
    this.portfoliosSubscription = portfoliosService.portfolios$.subscribe(portfolios => {
      this.portfolios = portfolios;
    });
    this.selectedPortfolioSubscription = portfoliosService.selectedPortfolio$.subscribe(portfolio => {
      setTimeout(() => {
        this.portfolioIndex = this.portfolios.indexOf(portfolio);
      }, 100);
    });
  }

  ngOnDestroy(): void {
    this.portfoliosSubscription.unsubscribe();
    this.selectedPortfolioSubscription.unsubscribe();
  }

  // Event Handlers
  handleAddPortfolio = (portfolioName?: string) => {
    if (portfolioName) {
      this.portfoliosService.addPortfolio(portfolioName);
    }
    this.frmAddPortfolio.hide();
  }
  handlListPortfolio = (portfolioName?: string) => {
    if (portfolioName) {
      this.portfoliosService.selectPortfolio(portfolioName);
    }
    this.frmListPortfolio.hide();
  }
  handlDeletePortfolio = (portfolioName: string) => {
    this.portfoliosService.deletePortfolio(portfolioName);
  }
  handleOpenAddDialog2 = () => {
    this.usedNames = this.portfoliosService.getList().map(portfolio => portfolio.name);
    this.selectedPortfolioName = this.portfoliosService.selectedPortfolioName;
    this.frmAddPortfolio.show(true);
  }
  handleOpenListDialog2 = () => {
    this.usedNames = this.portfoliosService.getList().map(portfolio => portfolio.name);
    this.selectedPortfolioName = this.portfoliosService.selectedPortfolioName;
    this.frmListPortfolio.show(true);
  }
  handleOpenSettings = () => {
    this.appService.toggleSettingsPanel();
  }

  selectTab(s: WjTabPanel) {
    this.portfoliosService.selectPortfolio(s.selectedTab.header.textContent);
  }
}
