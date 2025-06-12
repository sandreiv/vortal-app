import { Component, computed, EventEmitter, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-menu-task',
  standalone: true,
  imports: [MenuModule, ButtonModule],
  templateUrl: './menu-task.component.html',
  styleUrl: './menu-task.component.scss'
})
export class MenuTaskComponent {
  @Output() onEdit = new EventEmitter<void>();
  @Output() onDelete = new EventEmitter<void>();

  readonly menuItems = computed<MenuItem[]>(() => [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => this.onEdit.emit()
    }
  ]);
}
