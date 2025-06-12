import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StyleService } from '../../services/style.service'
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pendiente' | 'en-progreso' | 'completada';
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
  currentStyle = computed(() => this.styleService.currentStyle())

  constructor(private styleService: StyleService) {}


  pendientes = signal<Task[]>([
    {
      id: 1,
      title: 'Implementar autenticación',
      description: 'Agregar sistema de login y registro',
      status: 'pendiente'
    },
    {
      id: 2,
      title: 'Diseñar base de datos',
      description: 'Crear esquema de la base de datos',
      status: 'pendiente'
    }
  ]);

  enProgreso = signal<Task[]>([
    {
      id: 3,
      title: 'Desarrollar API REST',
      description: 'Crear endpoints para el backend',
      status: 'en-progreso'
    }
  ]);

  completadas = signal<Task[]>([
    {
      id: 4,
      title: 'Configurar proyecto',
      description: 'Inicializar proyecto Angular',
      status: 'completada'
    }
  ]);

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
} 