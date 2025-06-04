import { Component } from '@angular/core'
import { MenuItem } from 'primeng/api'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { StyleClassModule } from 'primeng/styleclass'
import { LayoutService } from '../../service/layout.service'
import { ConfiguratorComponent } from '../configurator/configurator.component'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, StyleClassModule, ConfiguratorComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  items!: MenuItem[]

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }))
  }
}
