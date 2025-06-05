import { Component } from '@angular/core'
import { CardControlsComponent } from '../../../shared/components/card-controls/card-controls.component'
import { MenuItemComponent } from '../../../shared/components/menu-item/menu-item.component'
@Component({
  standalone: true,
  selector: 'app-revenue-stream-widget',
  imports: [CardControlsComponent, MenuItemComponent],
  template: `<div class="card mb-4" [class.minimized]="isMinimized" [class.fullscreen]="isFullscreen">
    <div class="flex justify-between items-center mb-6">
      <h5>Revenue Stream</h5>
      <div class="flex items-center gap-2">
        <app-card-controls (minimize)="onMinimize()" (maximize)="onMaximize()">
        </app-card-controls>
        <app-menu-item (fullscreen)="onFullscreen()"> </app-menu-item>
      </div>
    </div>
    <div class="flex flex-column gap-3" [class.hidden]="isMinimized">
      <div class="flex align-items-center gap-3">
        <div
          class="flex align-items-center justify-content-center bg-orange-100 border-round"
          style="width:3rem;height:3rem">
          <i class="pi pi-chart-line text-orange-500 text-xl"></i>
        </div>
        <div class="flex-1 flex flex-column gap-1">
          <span class="text-900 font-medium">Monthly Revenue</span>
          <span class="text-600 text-sm">$2,500.00</span>
        </div>
        <span class="text-900 font-medium">$2,500.00</span>
      </div>
    </div>
  </div>`,
  styleUrls: ['../../../../assets/pages/dashboard/_dashboard.scss'],
})
export class RevenueStreamWidgetComponent {
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
  
}
