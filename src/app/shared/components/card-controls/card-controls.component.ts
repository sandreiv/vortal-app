import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule, Menu } from 'primeng/menu';

@Component({
  selector: 'app-card-controls',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenuModule],
  template: `
    <div class="flex items-center gap-1">
      <button
        type="button"
        pButton
        [icon]="isMinimized ? 'pi pi-plus' : 'pi pi-minus'"
        class="p-button-rounded p-button-text p-button-plain p-button-sm"
        (click)="toggleMinimize()">
      </button>
      <button
        type="button"
        pButton
        icon="pi pi-ellipsis-v"
        class="p-button-rounded p-button-text p-button-plain p-button-sm"
        (click)="menu.toggle($event)">
      </button>
      <p-menu #menu [popup]="true" [model]="getMenuItems()"></p-menu>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .p-button-sm {
        width: 2rem;
        height: 2rem;
        .p-button-icon {
          font-size: 0.875rem;
        }
      }
    }
  `]
})
export class CardControlsComponent {
  readonly minimize = output<void>();
  readonly maximize = output<void>();
  readonly fullscreen = output<void>();
  
  isMinimized = false;
  isFullscreen = false;
  menu: Menu | null = null;

  getMenuItems() {
    return [
      { 
        label: this.isFullscreen ? 'Volver' : 'Pantalla completa', 
        icon: this.isFullscreen ? 'pi pi-times' : 'pi pi-plus',
        command: () => this.toggleFullscreen()
      },
      { label: 'Personalizar', icon: 'pi pi-cog' },
      { label: 'Eliminar', icon: 'pi pi-trash' }
    ];
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
    if (this.isMinimized) {
      this.minimize.emit(undefined);
    } else {
      this.maximize.emit(undefined);
    }
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
    this.fullscreen.emit(undefined);
  }
} 