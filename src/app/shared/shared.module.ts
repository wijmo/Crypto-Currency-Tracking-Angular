import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

import { HttpClientModule } from '@angular/common/http';

import { WjNavModule } from '@grapecity/wijmo.angular2.nav';

import { RowComponent } from './components/row/row.component';
import { ColumnComponent } from './components/column/column.component';
import { SettingsPanelComponent } from './components/settings-panel/settings-panel.component';


@NgModule({
  declarations: [
    RowComponent,
    ColumnComponent,
    SettingsPanelComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    HttpClientModule,
    WjNavModule
  ],
  exports: [
    BrowserAnimationsModule,
    RowComponent,
    ColumnComponent,
    SettingsPanelComponent,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    WjNavModule
  ],
})
export class SharedModule { }
