import { Injectable, signal } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class StyleService {
  private currentStyleSignal = signal<string>('default')
  currentStyle = this.currentStyleSignal.asReadonly()

  setStyle(style: string) {
    this.currentStyleSignal.set(style)
  }

  getCurrentStyle(): string {
    return this.currentStyleSignal()
  }
}
