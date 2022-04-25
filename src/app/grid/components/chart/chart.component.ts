import { Component, Input, OnInit } from '@angular/core';

// wijmo components
import { ChartElement } from '@grapecity/wijmo.chart';
import * as wjChartInteraction from '@grapecity/wijmo.chart.interaction';
import {DataService} from '../../../shared/data.service';

/**
 * Chart component
 */
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  @Input()
  get item(): any {
    return this._item;
  }
  set item(val: any) {
    this._item = val;
  }
  // tslint:disable-next-line:variable-name
  private _item: any;

  range: any;
  private rangeMax: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.rangeMax = this.item.history.length - 1;
    if (!this.dataService.detailChartRange) {
      this.dataService.detailChartRange = {axisMin: 0, axisMax: this.rangeMax};
    }
    this.range = this.dataService.detailChartRange;
  }

  /**
   * Gets or sets the item formatter function that allows you to customize the appearance of the chart elements.
   * @arg engine - The chart's IRenderEngine responsible for rendering elements on the chart.
   * @arg hitTestInfo - Parameter that describes the element being rendered.
   * @arg hitTestInfo - Function that provides the default rendering for the item.
   */
  itemFormatter = (engine, hitTestInfo, defaultFormat) => {
    const {chartElement, series, pointIndex} = hitTestInfo;
    const formatterEngine = engine;
    const tradeBinding = 'high,low,open,close';
    const binding = 'volume';

    if (pointIndex >= 0 && chartElement === ChartElement.SeriesSymbol) {
      if (series.binding === tradeBinding || series.binding === binding) {
        // get current and previous values
        const {chart} = series;
        const {items} = chart.collectionView;

        if (items.length <= 1) {
          return;
        }

        const valClose = items[pointIndex].close;
        const valOpen = items[pointIndex].open;

        // Set default width of the stroke
        formatterEngine.strokeWidth = '1px';

        if (valOpen > valClose) {
          formatterEngine.fill = '#CB2C77';
          formatterEngine.stroke = '#CB2C77';
        } else {
          formatterEngine.stroke = '#73CA21';
          formatterEngine.fill = series.binding === binding ? '#73CA21' : 'white';
        }
      }
    }
    defaultFormat(); // render element as usual
  }

  /**
   * Raises the rangeChanged event.
   */
  rangeChanged = (sender: wjChartInteraction.RangeSelector) => {
    const axisMax = sender.max ?? this.dataService.detailChartRange.axisMax;
    this.range = {axisMin: Math.floor(sender.min), axisMax: Math.floor(axisMax)};
    this.dataService.detailChartRange = this.range;
  }

}
