import { Component } from '@angular/core'
import { AppMenuComponent } from '../menu/menu.component'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AppMenuComponent],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
