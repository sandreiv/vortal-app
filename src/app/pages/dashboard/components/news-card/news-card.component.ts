import { Component, computed } from '@angular/core'

import { TagModule } from 'primeng/tag'
import { MenuItemComponent } from '../../../../shared/components/menu-item/menu-item.component'
import { CardControlsComponent } from '../../../../shared/components/card-controls/card-controls.component'
import { StyleService } from '../../../../services/style.service'

interface NewsItem {
  title: string
  description: string
  image: string
  tag: string
}

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [TagModule, MenuItemComponent, CardControlsComponent],
  templateUrl: './news-card.component.html',
  styleUrls: ['./../../dashboard.component.scss'],
})
export class NewsCardComponent {
  currentStyle = computed(() => this.styleService.currentStyle())
  currentIndex = 0
  menu = null
  isMinimized = false
  isFullscreen = false

  news: NewsItem[] = [
    {
      title: 'Nueva Actualización del Sistema',
      description:
        'Se ha lanzado una nueva versión con mejoras significativas en el rendimiento y la interfaz de usuario.',
      image: 'assets/pages/img/noticia1.jpg',
      tag: 'Oficina de Planeación',
    },
    {
      title: 'Capacitación Docente',
      description:
        'Programa de capacitación para docentes sobre el uso de nuevas herramientas digitales.',
      image: 'assets/pages/img/noticia2.jpg',
      tag: 'Oficina de apoyo',
    },
    {
      title: 'Resultados Académicos',
      description:
        'Publicación de los resultados del último período académico.',
      image: 'assets/pages/img/noticia3.jpg',
      tag: 'Vicerrectoria',
    },
  ]

  constructor(private styleService: StyleService) {}

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.news.length
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.news.length) % this.news.length
  }

  onStyleChange(style: string) {
    this.styleService.setStyle(style)
  }

  onMinimize() {
    this.isMinimized = true
  }

  onMaximize() {
    this.isMinimized = false
  }

  onFullscreen() {
    this.isFullscreen = !this.isFullscreen
  }
}
