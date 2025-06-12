import { CommonModule } from '@angular/common'
import { Component, computed, signal, output } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import type { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  // Emitters para que el padre se entere
  readonly fullscreen = output<void>()
  readonly styleChange = output<string>()

  // Estado interno
  private isFullscreen = signal(false)

  // Señal computada para el modelo de menú
  readonly menuItems = computed<MenuItem[]>(() => [
    {
      label: this.isFullscreen() ? 'Volver' : 'Pantalla completa',
      icon: this.isFullscreen() ? 'pi pi-times' : 'pi pi-plus',
      command: () => this.toggleFullscreen(),
    },
  ])

  private toggleFullscreen() {
    this.isFullscreen.update((v) => !v)
    this.fullscreen.emit()
  }
}
