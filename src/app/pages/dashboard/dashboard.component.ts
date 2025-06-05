import { Component } from '@angular/core'
import { StatsWidgetComponent } from './components/statswidget'
import { RevenueStreamWidgetComponent } from './components/revenuestreamwidget'
import { NotificationsWidgetComponent } from './components/notificationswidget'
import { BasicCardWidgetComponent } from './components/basic-card-widget/basic-card-widget.component'

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
