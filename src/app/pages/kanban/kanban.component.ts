import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { StyleService } from '../../services/style.service'
import { MenuTaskComponent } from './components/menu-task/menu-task.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextarea } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pendiente' | 'en-progreso' | 'completada';
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [
    CommonModule, 
    DragDropModule, 
    MenuTaskComponent,
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputTextarea,
    FormsModule
  ],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
  currentStyle = computed(() => this.styleService.currentStyle())
  displayEditDialog = signal(false);
  editingTask = signal<Task | null>(null);
  editedTitle = signal('');
  editedDescription = signal('');

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

  editTask(task: Task) {
    console.log('Editando tarea:', task);
    this.editingTask.set(task);
    this.editedTitle.set(task.title);
    this.editedDescription.set(task.description);
    this.displayEditDialog.set(true);
  }

  saveTask() {
    if (this.editingTask()) {
      const task = this.editingTask()!;
      const updatedTask = {
        ...task,
        title: this.editedTitle(),
        description: this.editedDescription()
      };

      // Actualizar la tarea en la lista correspondiente
      if (task.status === 'pendiente') {
        this.pendientes.update(tasks => 
          tasks.map(t => t.id === task.id ? updatedTask : t)
        );
      } else if (task.status === 'en-progreso') {
        this.enProgreso.update(tasks => 
          tasks.map(t => t.id === task.id ? updatedTask : t)
        );
      } else {
        this.completadas.update(tasks => 
          tasks.map(t => t.id === task.id ? updatedTask : t)
        );
      }

      this.displayEditDialog.set(false);
      this.editingTask.set(null);
    }
  }

  cancelEdit() {
    this.displayEditDialog.set(false);
    this.editingTask.set(null);
  }

  deleteTask(task: Task) {
    // Implementar lógica de eliminación
    console.log('Eliminar tarea:', task);
  }
} 