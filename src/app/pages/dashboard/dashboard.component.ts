import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- importa esto
import { GridsterConfig, GridsterItem, GridsterModule } from 'angular-gridster2';

import { StatsWidgetComponent } from './components/statswidget';
import { RecentSalesWidgetComponent } from './components/recentsaleswidget';
import { BestSellingWidgetComponent } from './components/bestsellingwidget';
import { RevenueStreamWidgetComponent } from './components/revenuestreamwidget';
import { NotificationsWidgetComponent } from './components/notificationswidget';


interface WidgetItem extends GridsterItem {
  component: 'stats' | 'sales' | 'best' | 'revenue' | 'notifications';
}



@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule,GridsterModule,StatsWidgetComponent, RecentSalesWidgetComponent, BestSellingWidgetComponent, RevenueStreamWidgetComponent, NotificationsWidgetComponent],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  options: GridsterConfig = {
  draggable: { enabled: true },
  resizable: { enabled: true },
  pushItems: true,
  displayGrid: 'onDrag&Resize',
  gridType: 'fixed',
  fixedColWidth: 120,
  fixedRowHeight: 100,
  margin: 10
    };


  dashboard: WidgetItem[] = [
  { cols: 4, rows: 2, y: 0, x: 0, component: 'stats' },
  { cols: 6, rows: 2, y: 0, x: 4, component: 'sales' },
  { cols: 6, rows: 2, y: 2, x: 4, component: 'best' },
  { cols: 6, rows: 2, y: 2, x: 0, component: 'revenue' },
  { cols: 6, rows: 2, y: 4, x: 0, component: 'notifications' }
    ];

}
