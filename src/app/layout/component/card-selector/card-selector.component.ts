import { Component, OnInit, output } from '@angular/core'

import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule } from '@angular/forms'
import { DashboardService } from '../../../services/dashboard.service'

interface CardOption {
  id: string
  label: string
  checked: boolean
}

@Component({
  selector: 'app-card-selector',
  standalone: true,
  imports: [CheckboxModule, FormsModule],
  templateUrl: './card-selector.component.html',
  styleUrls: ['../../../../assets/layout/_topbar.scss'],
})
export class CardSelectorComponent implements OnInit {
  readonly cardsChanged = output<
    {
      id: string
      visible: boolean
    }[]
  >()

  cardOptions: CardOption[] = [
    { id: 'stats', label: 'Estadísticas', checked: true },
    { id: 'basic-card', label: 'Tarjeta Básica', checked: true },
    { id: 'contact-info', label: 'Información de Contacto', checked: true },
    { id: 'news', label: 'Noticias', checked: true },
    { id: 'apli-cards', label: 'Aplicaciones', checked: true },
  ]

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    const initialCards = this.dashboardService.getInitialCards()
    this.cardOptions = this.cardOptions.map((option) => ({
      ...option,
      checked:
        initialCards.find((card) => card.id === option.id)?.visible ?? true,
    }))
  }

  onCardToggle() {
    const visibleCards = this.cardOptions.map((card) => ({
      id: card.id,
      visible: card.checked,
    }))
    this.cardsChanged.emit(visibleCards)
  }
}
