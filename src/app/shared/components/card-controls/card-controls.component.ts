import { Component, output } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { MenuModule, Menu } from 'primeng/menu'

@Component({
  selector: 'app-card-controls',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './card-controls.component.html',
  styleUrls: ['./card-controls.component.scss'],
})
export class CardControlsComponent {
  readonly minimize = output<void>()
  readonly maximize = output<void>()

  isMinimized = false
  menu: Menu | null = null

  toggleMinimize() {
    this.isMinimized = !this.isMinimized
    if (this.isMinimized) {
      this.minimize.emit(undefined)
    } else {
      this.maximize.emit(undefined)
    }
  }
}
