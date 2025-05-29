import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { AppMenuitemComponent } from '../menuitem/menuitem.component'

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
        ],
      },
    ]
  }
}
