import '../license';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {NavigationModule} from './navigation/navigation.module';
import {GridModule} from './grid/grid.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
    declarations: [
      AppComponent,
    ],
    imports: [
      BrowserModule,
      NavigationModule,
      GridModule,
      SharedModule,
    ],
    exports: [
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
