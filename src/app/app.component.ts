import { Component } from '@angular/core';
import {AppService} from './shared/app.service';
import {Subscription} from 'rxjs';

/**
 * Main application component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSettingsPanelOpen = false;
  private isSettingsPanelOpenSubscription: Subscription;

  constructor(private appService: AppService) {
    this.isSettingsPanelOpenSubscription = this.appService.isSettingsPanelOpen$.subscribe(isOpen =>
      this.isSettingsPanelOpen = isOpen
    );
  }
}
