import { Component, OnInit } from '@angular/core'
import { RouterModule } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { AppMenuitemComponent } from '../menuitem/menuitem.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitemComponent, RouterModule],
  templateUrl: './menu.component.html',
})
export class AppMenuComponent implements OnInit {
  model: MenuItem[] = []

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Categorias', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          {
            label: 'Subcategorias',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
          { label: 'Productos', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Clientes', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Proveedores', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Ventas', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Compras', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
        ],
      },
      {
        label: 'Configuración',
        items: [
          { label: 'Usuarios', icon: 'pi pi-fw pi-user', routerLink: ['/'] },
          { label: 'Roles', icon: 'pi pi-fw pi-user', routerLink: ['/'] },
        ],
      },
      {
        label: 'Reportes',
        items: [
          {
            label: 'Reporte de Ventas',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/'],
          },
          {
            label: 'Reporte de Compras',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: 'Apps',
        items: [
          {
            label: 'WhatsApp',
            icon: 'pi pi-fw pi-whatsapp',
            routerLink: ['/'],
          },
          {
            label: 'Facebook',
            icon: 'pi pi-fw pi-facebook',
            routerLink: ['/'],
          },
        ],
      },
      {
        label: 'Contacto',
        items: [
          {
            label: 'WhatsApp',
            icon: 'pi pi-fw pi-whatsapp',
            routerLink: ['/'],
          },
          {
            label: 'Facebook',
            icon: 'pi pi-fw pi-facebook',
            routerLink: ['/'],
          },
        ],
      }
    ]
  }
}
