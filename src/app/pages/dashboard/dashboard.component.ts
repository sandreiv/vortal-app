import { Component, OnInit, OnDestroy, signal } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StatsWidgetComponent } from './components/statswidget'
import { BasicCardWidgetComponent } from './components/basic-card-widget/basic-card-widget.component'
import { ApliCardComponent } from './components/apli-card/apli-card.component'
import { NewsCardComponent } from './components/news-card/news-card.component'
import { DashboardService } from '../../services/dashboard.service'
import { Subscription } from 'rxjs'
import { computed } from '@angular/core'

interface Item {
  category: 'news' | 'blog' | 'tutorial'
  title: string
  content: string
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    StatsWidgetComponent,
    BasicCardWidgetComponent,
    ApliCardComponent,
    NewsCardComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  applications = [
    {
      title: 'Evaluación Docente',
      image: 'assets/pages/img/preview.jpg',
      description: 'Aplicativo de evaluación docente',
    },
    {
      title: 'Aplicación de Gestión',
      image: 'assets/pages/img/linux.png',
      description: 'Aplicativo de gestión de estudiantes',
    },
    {
      title: 'Otra Aplicación',
      image: 'assets/pages/img/centro-de-juegos.png',
      description: 'Descripción de otra aplicación',
    },
  ]

  visibleCards: Record<string, boolean> = {
    stats: true,
    'basic-card': true,
    'contact-info': true,
    news: true,
    'apli-cards': true,
  }

  private subscription: Subscription

  constructor(private dashboardService: DashboardService) {
    this.subscription = new Subscription()
  }

  ngOnInit() {
    this.subscription.add(
      this.dashboardService.cardsVisibility$.subscribe((cards) => {
        cards.forEach((card) => {
          this.visibleCards[card.id] = card.visible
        })
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private items = signal<Item[]>([
    {
      category: 'news',
      title: 'Noticia A',
      content: 'Contenido de la noticia A.',
    },
    { category: 'blog', title: 'Blog B', content: 'Contenido del blog B.' },
    {
      category: 'tutorial',
      title: 'Tutorial C',
      content: 'Contenido del tutorial C.',
    },
    {
      category: 'news',
      title: 'Noticia D',
      content: 'Contenido de la noticia D.',
    },
    {
      category: 'tutorial',
      title: 'Tutorial E',
      content: 'Contenido del tutorial E.',
    },
  ])

  readonly categories = ['news', 'blog', 'tutorial'] as const

  selectedCategory = signal<'news' | 'blog' | 'tutorial' | 'all'>('all')

  filteredItems = computed(() => {
    const cat = this.selectedCategory()
    const all = this.items()
    return cat === 'all' ? all : all.filter((item) => item.category === cat)
  })
}
