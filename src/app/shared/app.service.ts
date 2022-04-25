import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export interface Settings {
  isAutoUpdate: boolean;
  isCustomCells: boolean;
  isFreezeFirstCol: boolean;
  isFreezeFirstRow: boolean;
  rowHeight: number;
  headersRowHeight: number;
  updateInterval: number;
}

const initialState = {
  isSettingsPanelOpen: false,
  settings: {
    isAutoUpdate: true,
    isCustomCells: true,
    isFreezeFirstCol: false,
    isFreezeFirstRow: false,
    rowHeight: 60,
    headersRowHeight: 78,
    updateInterval: 30,
  },
};

/**
 * Common application service
 */
@Injectable({
  providedIn: 'root'
})
export class AppService {
  /**
   * Application state and settings parameters
   */
  appData: any = initialState;

  isSettingsPanelOpen$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  settings$: Subject<Settings> = new BehaviorSubject<Settings>(initialState.settings);

  constructor() { }

  toggleSettingsPanel(): void {
    this.appData.isSettingsPanelOpen = !this.appData.isSettingsPanelOpen;
    this.isSettingsPanelOpen$.next(this.appData.isSettingsPanelOpen);
  }

  updateSettings(subSettings: Partial<Settings>): void {
    this.appData.settings = {...this.appData.settings, ...subSettings};
    this.settings$.next(this.appData.settings);
  }
}
