import { Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'

interface CardOption {
  id: string
  label: string
  checked: boolean
}

@Component({
  selector: 'app-card-selector',
  standalone: true,
  imports: [CommonModule, CheckboxModule, FormsModule],
  templateUrl: './card-selector.component.html',
  styleUrl: '../../../../../assets/pages/dashboard/_dashboard.scss',
})
export class CardSelectorComponent {
  @Output() cardsChanged = new EventEmitter<
    { id: string; visible: boolean }[]
  >()

  cardOptions: CardOption[] = [
    { id: 'stats', label: 'Estadísticas', checked: true },
    { id: 'basic-card', label: 'Tarjeta Básica', checked: true },
    { id: 'revenue', label: 'Flujo de Ingresos', checked: true },
    { id: 'news', label: 'Noticias', checked: true },
    { id: 'apli-cards', label: 'Aplicaciones', checked: true },
  ]

  onCardToggle() {
    const visibleCards = this.cardOptions.map((card) => ({
      id: card.id,
      visible: card.checked,
    }))
    this.cardsChanged.emit(visibleCards)
  }
}
