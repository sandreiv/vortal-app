import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { CommonModule } from '@angular/common'
import { AppMenuContentComponent } from '../menu-content/menu-content.component'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, AppMenuContentComponent],
  templateUrl: './menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: MenuItem[] = []

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: 'Apps',
        items: [
          {
            label: 'Calendar',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/calendar'],
          },
          {
            label: 'Contacto dependencias',
            icon: 'pi pi-fw pi-phone',
            routerLink: ['/contact-info'],
            items: [
              {
                label: 'Facultades',
                icon: 'pi pi-fw pi-building',
                routerLink: ['/contact-info/facultades'],
              },
              {
                label: 'Oficinas administrativas',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/contact-info/oficinas-administrativas'],
              },
              {
                label: 'Vicerrectorías',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/contact-info/vicerrectorias'],
              },
            ],
          },
        ],
      },
    ]
  }
}
