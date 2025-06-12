import {
  Component,
  output,
  ViewChild,
  HostListener,
  computed,
} from '@angular/core'
import { MenuItem } from 'primeng/api'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { StyleClassModule } from 'primeng/styleclass'
import { LayoutService } from '../../service/layout.service'
import { Menu, MenuModule } from 'primeng/menu'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule } from '@angular/forms'
import { CardSelectorComponent } from '../card-selector/card-selector.component'
import { Router } from '@angular/router'
import { DashboardService } from '../../../services/dashboard.service'
import { StyleService } from '../../../services/style.service'
import { TooltipModule } from 'primeng/tooltip'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    MenuModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    CardSelectorComponent,
    TooltipModule,
  ],
  templateUrl: './header.component.html',
  styles: [
    `
      .configurator-container {
        position: absolute;
        right: 0;
        top: 100%;
        z-index: 1000;
      }
    `,
  ],
})
export class HeaderComponent {
  @ViewChild('profileMenu') profileMenu!: Menu
  @ViewChild('styleMenu') styleMenu!: Menu
  readonly fullscreen = output<void>()
  menu: Menu | null = null
  isFullscreen = false
  isScrolled = false
  searchText = ''
  showCardSelector = false
  isCardSelectorVisible = false

  currentStyle = computed(() => this.styleService.currentStyle())

  styleMenuItems: MenuItem[] = [
    {
      label: 'Estilos',
      items: [
        {
          label: 'Default',
          icon: 'pi pi-circle',
          command: () => this.changeStyle('default'),
        },
        {
          label: 'Moderno',
          icon: 'pi pi-circle-fill',
          command: () => this.changeStyle('modern'),
        },
        {
          label: 'Minimal',
          icon: 'pi pi-circle',
          command: () => this.changeStyle('minimal'),
        },
      ],
    },
  ]

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0
  }

  onSearch() {
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

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private dashboardService: DashboardService,
    private styleService: StyleService
  ) {
    this.router.events.subscribe(() => {
      this.showCardSelector = this.router.url.includes('/dashboard')
    })
  }

  changeStyle(style: string) {
    this.styleService.setStyle(style)
  }

  showStyleMenu(event: Event) {
    this.styleMenu.toggle(event)
  }

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

  showCardSelectorMenu() {
    const cardSelectorContainer = document.querySelector(
      '.card-selector-container'
    )
    if (cardSelectorContainer) {
      cardSelectorContainer.classList.remove('hidden')
      cardSelectorContainer.classList.add('animate-scalein')
      this.isCardSelectorVisible = true
    }
  }

  hideCardSelectorMenu() {
    const cardSelectorContainer = document.querySelector(
      '.card-selector-container'
    )
    if (cardSelectorContainer) {
      cardSelectorContainer.classList.add('hidden')
      cardSelectorContainer.classList.remove('animate-scalein')
      this.isCardSelectorVisible = false
    }
  }

  onCardsChanged(cards: { id: string; visible: boolean }[]) {
    this.dashboardService.updateCardsVisibility(cards)
  }
}
