import { Component } from '@angular/core';
import {AppService} from '../../app.service';

/**
 * Settings panel component
 */
@Component({
  selector: 'app-settings-panel',
  templateUrl: './settings-panel.component.html',
  styleUrls: ['./settings-panel.component.css']
})
export class SettingsPanelComponent {
  switches = [
    {key: 'isCustomCells', label: 'Custom Cells', isChecked: false},
    {key: 'isFreezeFirstCol', label: 'Freeze First Column', isChecked: false},
    {key: 'isFreezeFirstRow', label: 'Freeze First Row', isChecked: false},
    {key: 'isAutoUpdate', label: 'Auto Update', isChecked: false},
  ];
  intervalOptions = [ 3, 5, 10, 20, 30, 60 ];
  interval: number;
  rowHeightOptions = [
    {value: 40, label: 'Tiny'},
    {value: 60, label: 'Normal'},
    {value: 80, label: 'Wide'},
  ];
  rowHeight: number;

  constructor(private appService: AppService) {
    this.switches.forEach(item => {
      item.isChecked = appService.appData.settings[item.key];
    });
    this.interval = appService.appData.settings.updateInterval;
    this.rowHeight = appService.appData.settings.rowHeight;
  }

  closePanel(): void {
    this.appService.toggleSettingsPanel();
  }

  intervalChanged(event): void {
    this.appService.updateSettings({updateInterval: event.value});
  }

  rowHeightChanged(event): void {
    this.appService.updateSettings({rowHeight: event.value});
  }

  switchChanged(key, event): void {
    this.appService.updateSettings({[key]: event.checked});
  }

}
