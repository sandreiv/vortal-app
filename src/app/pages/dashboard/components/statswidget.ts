import { Component, input, computed } from '@angular/core'
import { MenuItemComponent } from '../../../shared/components/menu-item/menu-item.component'
import { StyleService } from '../../../services/style.service'

@Component({
  standalone: true,
  selector: 'app-stats-widget',
  imports: [MenuItemComponent],
  template: `<div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div
        class="card mb-0"
        [class.minimized]="isMinimized"
        [class.fullscreen]="isFullscreen"
        [class.style-modern]="currentStyle() === 'modern'"
        [class.style-minimal]="currentStyle() === 'minimal'">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Orders</span>
            <div
              class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              152
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
          </div>
        </div>
        <div class="flex justify-end">
          <app-menu-item
            (fullscreen)="onFullscreen()"
            (styleChange)="onStyleChange($event)">
          </app-menu-item>
        </div>
        <span class="text-primary font-medium">24 new </span>
        <span class="text-muted-color">since last visit</span>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div
        class="card mb-0"
        [class.minimized]="isMinimized"
        [class.fullscreen]="isFullscreen"
        [class.style-modern]="currentStyle() === 'modern'"
        [class.style-minimal]="currentStyle() === 'minimal'">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4">Revenue</span>
            <div
              class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              $2.100
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-dollar text-orange-500 !text-xl"></i>
          </div>
        </div>
        <div class="flex justify-end">
          <app-menu-item
            (fullscreen)="onFullscreen()"
            (styleChange)="onStyleChange($event)">
          </app-menu-item>
        </div>
        <span class="text-primary font-medium">%52+ </span>
        <span class="text-muted-color">since last week</span>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div
        class="card mb-0"
        [class.minimized]="isMinimized"
        [class.fullscreen]="isFullscreen"
        [class.style-modern]="currentStyle() === 'modern'"
        [class.style-minimal]="currentStyle() === 'minimal'">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4"
              >Customers</span
            >
            <div
              class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              28441
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-users text-cyan-500 !text-xl"></i>
          </div>
        </div>
        <div class="flex justify-end">
          <app-menu-item
            (fullscreen)="onFullscreen()"
            (styleChange)="onStyleChange($event)">
          </app-menu-item>
        </div>
        <span class="text-primary font-medium">520 </span>
        <span class="text-muted-color">newly registered</span>
      </div>
    </div>
    <div class="col-span-12 lg:col-span-6 xl:col-span-3">
      <div
        class="card mb-0"
        [class.minimized]="isMinimized"
        [class.fullscreen]="isFullscreen"
        [class.style-modern]="currentStyle() === 'modern'"
        [class.style-minimal]="currentStyle() === 'minimal'">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-4"
              >Comments</span
            >
            <div
              class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              152 Unread
            </div>
          </div>
          <div
            class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-comment text-purple-500 !text-xl"></i>
          </div>
        </div>
        <div class="flex justify-end">
          <app-menu-item
            (fullscreen)="onFullscreen()"
            (styleChange)="onStyleChange($event)">
          </app-menu-item>
        </div>
        <span class="text-primary font-medium">85 </span>
        <span class="text-muted-color">responded</span>
      </div>
    </div>`,
  styleUrls: ['../../../../assets/pages/dashboard/_dashboard.scss'],
})
export class StatsWidgetComponent {
  title = input('')
  image = input('')
  description = input('')

  menu = null
  isMinimized = false
  isFullscreen = false
  currentStyle = computed(() => this.styleService.currentStyle())

  constructor(private styleService: StyleService) {}

  onMinimize() {
    this.isMinimized = true
  }

  onMaximize() {
    this.isMinimized = false
  }

  onFullscreen() {
    this.isFullscreen = !this.isFullscreen
  }

  onStyleChange(style: string) {
    this.styleService.setStyle(style)
  }
}
