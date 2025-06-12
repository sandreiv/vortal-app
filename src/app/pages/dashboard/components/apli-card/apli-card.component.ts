import { Component, input, computed } from '@angular/core'
import { MenuItemComponent } from '../../../../shared/components/menu-item/menu-item.component'
import { CommonModule } from '@angular/common'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { StyleService } from '../../../../services/style.service'

@Component({
  selector: 'app-apli-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule, MenuItemComponent],
  templateUrl: './apli-card.component.html',
  styleUrls: ['./apli-card.component.scss'],
})
export class ApliCardComponent {
  // Componente hijo, los datos se pasan desde el componente padre.
  // Se usa input para recibir los datos desde el componente padre.
  title = input('')
  image = input('')
  description = input('')

  menu = null
  isMinimized = false
  isFullscreen = false
  currentStyle = computed(() => this.styleService.currentStyle())

  constructor(private styleService: StyleService) {}

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
