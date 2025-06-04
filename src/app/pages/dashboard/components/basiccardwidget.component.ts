import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { MenuModule } from 'primeng/menu'

@Component({
  standalone: true,
  selector: 'app-basic-card-widget',
  imports: [CommonModule, ButtonModule, MenuModule],
  templateUrl: './basiccardwidget.component.html',
  styleUrls: ['../../../../assets/pages/dashboard/_dashboard.scss'],
})
export class BasicCardWidgetComponent {
  menu = null

  items = [
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-trash' },
  ]
}
