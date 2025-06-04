import { Component } from '@angular/core'

@Component({
  standalone: true,
  selector: 'app-revenue-stream-widget',
  imports: [],
  template: `<div class="card mb-4">
    <h5>Revenue Stream</h5>
    <div class="flex flex-column gap-3">
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
export class RevenueStreamWidgetComponent {}
