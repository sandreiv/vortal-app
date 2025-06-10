import { Component, input } from '@angular/core'

@Component({
  selector: 'app-dynamic-card',
  imports: [],
  standalone: true,
  templateUrl: './dynamic-card.html',
  styleUrl: './dynamic-card.scss',
})
export class DynamicCardComponent {
  // Definimos inputs como signals
  readonly title = input<string>()
  readonly content = input<string>()
}
