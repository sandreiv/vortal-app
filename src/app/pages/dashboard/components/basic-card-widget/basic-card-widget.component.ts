import { CommonModule } from '@angular/common'
import { Component, computed } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { MenuItemComponent } from '../../../../shared/components/menu-item/menu-item.component'
import { CardControlsComponent } from '../../../../shared/components/card-controls/card-controls.component'
import { StyleService } from '../../../../services/style.service'

@Component({
  standalone: true,
  selector: 'app-basic-card-widget',
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    CardControlsComponent,
    MenuItemComponent,
  ],
  templateUrl: './basic-card-widget.component.html',
  styleUrls: ['../../../../../assets/pages/dashboard/_dashboard.scss'],
})
export class BasicCardWidgetComponent {
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

  onStyleChange(style: string) {
    this.styleService.setStyle(style)
  }
}
