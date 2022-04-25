import { Component, HostBinding, Input } from '@angular/core';

/**
 * Row's Column layout component
 */
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  private classNames: string;
  @HostBinding('classes')
  get classes() {
    return 'column' + (this.classNames ? ` ${this.classNames}` : '');
  }

  @Input()
  set class(val: string) {this.classNames = val; }

  constructor() { }

}
