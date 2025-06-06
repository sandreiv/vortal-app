import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

interface NewsItem {
  title: string;
  description: string;
  image: string;
  tag: string;
}

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [TagModule],
  templateUrl: './news-card.component.html',
  styleUrls: ['../../../../../assets/pages/dashboard/_dashboard.scss'],
})
export class NewsCardComponent {
  currentIndex = 0;
  news: NewsItem[] = [
    {
      title: 'Nueva Actualización del Sistema',
      description: 'Se ha lanzado una nueva versión con mejoras significativas en el rendimiento y la interfaz de usuario.',
      image: 'assets/pages/img/noticia1.jpg',
      tag: 'Oficina de Planeación'
    },
    {
      title: 'Capacitación Docente',
      description: 'Programa de capacitación para docentes sobre el uso de nuevas herramientas digitales.',
      image: 'assets/pages/img/noticia2.jpg',
      tag: 'Oficina de apoyo'
    },
    {
      title: 'Resultados Académicos',
      description: 'Publicación de los resultados del último período académico.',
      image: 'assets/pages/img/noticia3.jpg',
      tag: 'Vicerrectoria'
    }
  ];

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.news.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.news.length) % this.news.length;
  }
}
