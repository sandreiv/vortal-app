import { Component, computed, signal, model } from '@angular/core'

import { FormsModule } from '@angular/forms'
import { StyleService } from '../../../../services/style.service'

interface TodoItem {
  id: number
  title: string
  completed: boolean
  date: string
  color: string // ← Nuevo campo agregado
}

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './to-do.component.html',
  styleUrls: ['../../calendar.component.scss'],
})
export class ToDoComponent {
  @Input({ required: true }) todoListSignal!: WritableSignal<TodoItem[]>
  @Input({ required: true }) removeEventByTodoId!: (todoId: number) => void


  todoAdded = model<(todo: TodoItem) => void>()

  newTodoTitle = signal('')
  newTodoDate = signal('')
  selectedColor = signal('#F56565') // ← Color por defecto (rojo)

  todos = computed(() => this.todoListSignal())

  colorOptions = [
    { label: 'Red', value: '#F56565' },
    { label: 'Green', value: '#68D391' },
    { label: 'Blue', value: '#63B3ED' },
    { label: 'Yellow', value: '#FBD38D' },
    { label: 'Purple', value: '#B794F4' },
    { label: 'Gray', value: '#A0AEC0' },
  ]

  constructor(private styleService: StyleService) {}

  currentStyle = computed(() => this.styleService.currentStyle())

  addTodo() {
    if (this.newTodoTitle() && this.newTodoDate()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        title: this.newTodoTitle(),
        completed: false,
        date: this.newTodoDate(),
        color: this.selectedColor(), // ← Se guarda el color seleccionado
      }

      this.todoAdded()?.(newTodo)
      this.newTodoTitle.set('')
      this.newTodoDate.set('')
      this.selectedColor.set('#F56565') // ← Reiniciar color si se desea
    }
  }

  toggleTodo(todo: TodoItem) {
    const updated = this.todoListSignal().map((t) =>
      t.id === todo.id ? { ...t, completed: !t.completed } : t
    )
    this.todoListSignal.set(updated)
  }

  deleteTodo(todo: TodoItem) {
    const filtered = this.todoListSignal().filter((t) => t.id !== todo.id)
    this.todoListSignal.set(filtered)
    // Llama a la función del calendario para borrar también el evento
    this.removeEventByTodoId?.(todo.id)
  }
}
