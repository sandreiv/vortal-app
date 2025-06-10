import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

export interface CardVisibility {
  id: string
  visible: boolean
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private initialCards: CardVisibility[] = [
    { id: 'stats', visible: true },
    { id: 'basic-card', visible: true },
    { id: 'revenue', visible: true },
    { id: 'news', visible: true },
    { id: 'apli-cards', visible: true },
  ]

  private cardsVisibility = new BehaviorSubject<CardVisibility[]>(
    this.initialCards
  )
  cardsVisibility$ = this.cardsVisibility.asObservable()

  updateCardsVisibility(cards: CardVisibility[]) {
    this.cardsVisibility.next(cards)
  }

  getInitialCards(): CardVisibility[] {
    return this.initialCards
  }
}
