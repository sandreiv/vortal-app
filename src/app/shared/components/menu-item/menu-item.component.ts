import { CommonModule } from '@angular/common'
import { Component, output } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { MenuModule, Menu } from 'primeng/menu'

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule],
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  readonly fullscreen = output<void>()
  menu: Menu | null = null
  isFullscreen = false

  getMenuItems() {
    return [
      {
        label: this.isFullscreen ? 'Volver' : 'Pantalla completa',
        icon: this.isFullscreen ? 'pi pi-times' : 'pi pi-plus',
        command: () => this.toggleFullscreen(),
      },
      { label: 'Personalizar', icon: 'pi pi-cog' },
      { label: 'Eliminar', icon: 'pi pi-trash' },
    ]
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen
    this.fullscreen.emit(undefined)
  }
}
