import { Component, computed, inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { StyleClassModule } from 'primeng/styleclass'
import { ConfiguratorComponent } from '../configurator/configurator.component'
import { LayoutService } from '../../service/layout.service'

@Component({
  selector: 'app-floating-configurator',
  imports: [ButtonModule, StyleClassModule, ConfiguratorComponent],
  templateUrl: './floatingconfigurator.component.html',
})
export class FloatingConfiguratorComponent {
  LayoutService = inject(LayoutService)

  isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme)

  toggleDarkMode() {
    this.LayoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }))
  }
}
