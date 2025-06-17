import { Component, computed, inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { StyleClassModule } from 'primeng/styleclass'
import { LayoutService } from '../../../services/layout.service'

@Component({
  selector: 'app-floating-configurator',
  imports: [ButtonModule, StyleClassModule],
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
