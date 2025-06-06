import { Component } from '@angular/core'
import { StatsWidgetComponent } from './components/statswidget'
import { RevenueStreamWidgetComponent } from './components/revenuestreamwidget'
import { BasicCardWidgetComponent } from './components/basic-card-widget/basic-card-widget.component'
import { ApliCardComponent } from './components/apli-card/apli-card.component'
import { NewsCardComponent } from './components/news-card/news-card.component'
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StatsWidgetComponent,
    BasicCardWidgetComponent,
    RevenueStreamWidgetComponent,
    ApliCardComponent,
    NewsCardComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  applications = [
    {
      title: 'Evaluación Docente',
      image: 'assets/pages/img/preview.jpg',
      description: 'Aplicativo de evaluación docente'
    },
    {
      title: 'Aplicación de Gestión',
      image: 'assets/pages/img/linux.png',
      description: 'Aplicativo de gestión de estudiantes'
    },
    {
      title: 'Otra Aplicación',
      image: 'assets/pages/img/centro-de-juegos.png',
      description: 'Descripción de otra aplicación'
    }
  ];
}
