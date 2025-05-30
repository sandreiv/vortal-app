import { Component } from '@angular/core';


@Component({
    standalone: true,
    selector: 'app-best-selling-widget',
    imports: [],
    template: `<div class="card">
        <h5>Best Selling Products</h5>
        <div class="flex flex-column gap-3">
            <div class="flex align-items-center gap-3">
                <div class="flex align-items-center justify-content-center bg-green-100 border-round" style="width:3rem;height:3rem">
                    <i class="pi pi-star text-green-500 text-xl"></i>
                </div>
                <div class="flex-1 flex flex-column gap-1">
                    <span class="text-900 font-medium">Product Name</span>
                    <span class="text-600 text-sm">$150.00</span>
                </div>
                <span class="text-900 font-medium">$150.00</span>
            </div>
        </div>
    </div>`
})
export class BestSellingWidgetComponent {}
