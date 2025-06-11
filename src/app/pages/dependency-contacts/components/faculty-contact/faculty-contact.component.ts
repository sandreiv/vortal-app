import { Component, input } from '@angular/core'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-faculty-contact',
  standalone: true,
  imports: [ ButtonModule],
  templateUrl: './faculty-contact.component.html',
  styleUrls: ['./faculty-contact.component.scss'],
})
export class FacultyContactComponent {
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
  email = input('')
  phone = input('')
  facebook = input('')
  instagram = input('')
  twitter = input('')
  youtube = input('')
  tiktok = input('')
  website = input('')
}
