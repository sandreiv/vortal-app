import { Component, input } from '@angular/core'
import { MenuItemComponent } from '../../../../shared/components/menu-item/menu-item.component'
import { CardControlsComponent } from '../../../../shared/components/card-controls/card-controls.component'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [CardControlsComponent, MenuItemComponent, ButtonModule],
  templateUrl: './admin-contact.component.html',
  styleUrls: ['../../dependency-contacts.component.scss'],
})
export class AdminContactComponent {
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

  title = input('')
  image = input('')
  email = input('')
  phone = input('')
  facebook = input('')
  instagram = input('')
  twitter = input('')
  youtube = input('')
  tiktok = input('')
  website = input('')
}
