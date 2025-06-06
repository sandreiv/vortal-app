import { Component, output, ViewChild, HostListener } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { StyleClassModule } from 'primeng/styleclass'
import { LayoutService } from '../../service/layout.service'
import { ConfiguratorComponent } from '../configurator/configurator.component'
import { Menu, MenuModule } from 'primeng/menu'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    ConfiguratorComponent,
    MenuModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @ViewChild('profileMenu') profileMenu!: Menu
  readonly fullscreen = output<void>()
  menu: Menu | null = null
  isFullscreen = false
  isScrolled = false
  searchText = ''

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0
  }

  onSearch() {
    // Aquí puedes implementar la lógica de búsqueda
    console.log('Buscando:', this.searchText)
  }

  items!: MenuItem[]
  profileMenuItems: MenuItem[] = [
    {
      label: 'Juan Perez',
      icon: 'pi pi-user',
      disabled: true,
    },
    {
      separator: true,
    },
    {
      label: 'Ajustes',
      icon: 'pi pi-cog',
    },
    {
      label: this.isFullscreen ? 'Volver' : 'Pantalla completa',
      icon: this.isFullscreen ? 'pi pi-times' : 'pi pi-plus',
      command: () => this.toggleFullscreen(),
    },
    {
      separator: true,
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
    },
  ]

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }))
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen
    this.fullscreen.emit(undefined)

    const elem = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => void
      msRequestFullscreen?: () => void
    }

    if (this.isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
      }
    } else {
      const doc = document as Document & {
        webkitExitFullscreen?: () => void
        msExitFullscreen?: () => void
      }
      if (doc.exitFullscreen) {
        doc.exitFullscreen()
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen()
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen()
      }
    }
  }

  showProfileMenu(event: Event) {
    this.profileMenu.toggle(event)
  }
}
