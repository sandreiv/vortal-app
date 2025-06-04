import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'
import { CardControlsComponent } from '../../../shared/components/card-controls/card-controls.component'

@Component({
  standalone: true,
  selector: 'app-basic-card-widget',
  imports: [CommonModule, ButtonModule, MenuModule, CardControlsComponent],
  templateUrl: './basiccardwidget.component.html',
  styleUrls: ['../../../../assets/pages/dashboard/_dashboard.scss'],
})
export class BasicCardWidgetComponent {
  menu = null
  isMinimized = false
  isFullscreen = false

  onMinimize() {
    this.isMinimized = true;
  }

  onMaximize() {
    this.isMinimized = false;
  }

  onFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }
}
