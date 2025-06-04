import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-notifications-widget',
  imports: [],
  template: `<div class="card">
    <h5>Notifications</h5>
    <div class="flex flex-column gap-3">
      <div class="flex align-items-center gap-3">
        <div
          class="flex align-items-center justify-content-center bg-red-100 border-round"
          style="width:3rem;height:3rem">
          <i class="pi pi-bell text-red-500 text-xl"></i>
        </div>
        <div class="flex-1 flex flex-column gap-1">
          <span class="text-900 font-medium">New Message</span>
          <span class="text-600 text-sm">You have a new message</span>
        </div>
        <span class="text-900 font-medium">2m ago</span>
      </div>
    </div>
  </div>`,
  styleUrls: ['../../../../assets/pages/dashboard/_dashboard.scss'],
})
export class NotificationsWidgetComponent {}
