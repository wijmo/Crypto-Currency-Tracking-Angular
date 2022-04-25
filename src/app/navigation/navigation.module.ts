import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WjInputModule } from '@grapecity/wijmo.angular2.input';


import { NavigationComponent } from './components/navigation/navigation.component';
import { AppBarComponent } from './components/app-bar/app-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SharedModule } from '../shared/shared.module';
import { DialogAddPortfolioComponent } from './components/dialog-add-portfolio/dialog-add-portfolio.component';
import { DialogListPortfolioComponent } from './components/dialog-list-portfolio/dialog-list-portfolio.component';

@NgModule({
  declarations: [
    NavigationComponent,
    AppBarComponent,
    TopBarComponent,
    DialogAddPortfolioComponent,
    DialogListPortfolioComponent
  ],
  exports: [
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    WjInputModule,
  ]
})
export class NavigationModule { }
