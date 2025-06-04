import { Component } from '@angular/core'
import { StatsWidgetComponent } from './components/statswidget'
import { BasicCardWidgetComponent } from './components/basiccardwidget.component'
import { RevenueStreamWidgetComponent } from './components/revenuestreamwidget'
import { NotificationsWidgetComponent } from './components/notificationswidget'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StatsWidgetComponent,
    BasicCardWidgetComponent,
    RevenueStreamWidgetComponent,
    NotificationsWidgetComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
