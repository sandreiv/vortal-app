import { Component, input } from '@angular/core'
import { MenuItemComponent } from '../../../../shared/components/menu-item/menu-item.component'
import { CardControlsComponent } from '../../../../shared/components/card-controls/card-controls.component'
import { ButtonModule } from 'primeng/button'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-vice-contact',
  standalone: true,
  imports: [
    CardControlsComponent,
    MenuItemComponent,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './vice-contact.component.html',
  styleUrls: ['../../dependency-contacts.component.scss'],
})
export class ViceContactComponent {
  menu = null
  isMinimized = false
  isFullscreen = false

  onMinimize() {
    this.isMinimized = true
  }

  onMaximize() {
    this.isMinimized = false
  }

  onFullscreen() {
    this.isFullscreen = !this.isFullscreen
  }

  title = input.required<string>()
  image = input.required<string>()
  email = input.required<string>()
  phone = input.required<string>()
  website = input<string>()
  facebook = input<string>()
  instagram = input<string>()
  twitter = input<string>()
  youtube = input('')
  tiktok = input('')
}
