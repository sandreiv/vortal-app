import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MenuItem } from 'primeng/api'

import { AppMenuContentComponent } from '../menu-content/menu-content.component'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, AppMenuContentComponent],
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
            routerLink: ['/home/dashboard'],
          },
        ],
      },
      {
        label: 'Apps',
        items: [
          {
            label: 'Calendar',
            icon: 'pi pi-fw pi-calendar',
            routerLink: ['/apps/calendar'],
          },
          {
            label: 'Progreso de tareas',
            icon: 'pi pi-fw pi-list',
            routerLink: ['/apps/kanban'],
          },
          {
            label: 'Notas',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/apps/notes'],
          },
          {
            label: 'Contacto dependencias',
            icon: 'pi pi-fw pi-phone',
            items: [
              {
                label: 'Facultades',
                icon: 'pi pi-fw pi-building',
                routerLink: ['/apps/contact-info/facultades'],
              },
              {
                label: 'Oficinas administrativas',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/apps/contact-info/oficinas-administrativas'],
              },
              {
                label: 'Vicerrectorías',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/apps/contact-info/vicerrectorias'],
              },
            ],
          },
        ],
      },
    ]
  }
}
