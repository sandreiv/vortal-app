import { Component, computed, signal, input, output, Signal } from '@angular/core'

import { FormsModule } from '@angular/forms'
import { StyleService } from '../../../../services/style.service'
import { NgStyle } from '@angular/common'

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
  imports: [FormsModule, NgStyle],
  templateUrl: './to-do.component.html',
  styleUrls: ['../../calendar.component.scss'],
})
export class ToDoComponent {
  todoListSignal = input<Signal<TodoItem[]>>()
  removeEventByTodoId = input<(todoId: number) => void>()
  todoAdded = output<TodoItem>()
  todoToggled = output<TodoItem>()

  newTodoTitle = signal('')
  newTodoDate = signal('')
  selectedColor = signal('#F56565') // ← Color por defecto (rojo)

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
        color: this.selectedColor(),
      }
      this.todoAdded.emit(newTodo)
      this.newTodoTitle.set('')
      this.newTodoDate.set('')
      this.selectedColor.set('#F56565')
    }
  }

  toggleTodo(todo: TodoItem) {
    this.todoToggled.emit(todo)
  }

  deleteTodo(todo: TodoItem) {
    this.removeEventByTodoId?.()?.(todo.id);
  }

  todos() {
    return this.todoListSignal()?.() ?? [];
  }
}
