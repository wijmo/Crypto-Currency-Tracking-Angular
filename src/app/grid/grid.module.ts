import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { WjGridModule } from '@grapecity/wijmo.angular2.grid';
import { WjGridDetailModule } from '@grapecity/wijmo.angular2.grid.detail';
import { WjChartModule } from '@grapecity/wijmo.angular2.chart';
import { WjChartInteractionModule } from '@grapecity/wijmo.angular2.chart.interaction';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';

import { SharedModule } from '../shared/shared.module';
import { GridComponent, SafeHtmlPipe } from './components/grid/grid.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { GridMainComponent } from './components/grid-main/grid-main.component';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { ChartComponent } from './components/chart/chart.component';
import { DialogAddSymbolComponent } from './components/dialog-add-symbol/dialog-add-symbol.component';
import { DialogSelectColumnsComponent } from './components/dialog-select-columns/dialog-select-columns.component';

@NgModule({
  declarations: [
    GridComponent,
    SafeHtmlPipe,
    ToolbarComponent,
    GridMainComponent,
    DetailPanelComponent,
    ChartComponent,
    DialogAddSymbolComponent,
    DialogSelectColumnsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    WjGridModule,
    WjGridDetailModule,
    WjChartModule,
    WjChartInteractionModule,
    WjInputModule,
  ],
  exports: [
    GridMainComponent,
  ],
})
export class GridModule { }
