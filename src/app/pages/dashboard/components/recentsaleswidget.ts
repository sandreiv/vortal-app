import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule],
    template: `<div class="card mb-4">
        <h5>Recent Sales</h5>
        <div class="flex flex-column gap-3">
            <div class="flex align-items-center gap-3">
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:3rem;height:3rem">
                    <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                </div>
                <div class="flex-1 flex flex-column gap-1">
                    <span class="text-900 font-medium">Product Name</span>
                    <span class="text-600 text-sm">$120.00</span>
                </div>
                <span class="text-900 font-medium">$120.00</span>
            </div>
        </div>
    </div>`
})
export class RecentSalesWidgetComponent {}
