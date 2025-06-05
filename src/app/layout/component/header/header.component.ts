import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { StyleClassModule } from 'primeng/styleclass'
import { LayoutService } from '../../service/layout.service'
import { ConfiguratorComponent } from '../configurator/configurator.component'
import { MenuModule } from 'primeng/menu'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    ConfiguratorComponent,
    MenuModule,
    ButtonModule
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  items!: MenuItem[]
  profileMenuItems: MenuItem[] = [
    {
      label: 'Juan Perez',
      icon: 'pi pi-user',
      disabled: true
    },
    {
      separator: true
    },
    {
      label: 'Ajustes',
      icon: 'pi pi-cog'
    },
    {
      label: 'Pantalla completa',
      icon: 'pi pi-desktop'
    },
    {
      separator: true
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out'
    }
  ]

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }))
  }
}
