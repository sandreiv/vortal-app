import { Component, Input, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { StyleService } from '../../../../services/style.service'
@Component({
  selector: 'app-dynamic-card',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  template: `
    <p-card
      [header]="title"
      [style]="{ width: '100%' }"
      [class.style-modern]="currentStyle() === 'modern'"
      [class.style-minimal]="currentStyle() === 'minimal'"
    >
      <ng-content></ng-content>
    </p-card>
  `,
  styles: [`
    :host ::ng-deep {
      .p-card {
        transition: all 0.3s ease;
      }
    }
  `]
})
export class DynamicCardComponent {
  @Input() title = ''
  currentStyle = computed(() => this.styleService.currentStyle())

  constructor(private styleService: StyleService) {}
}
