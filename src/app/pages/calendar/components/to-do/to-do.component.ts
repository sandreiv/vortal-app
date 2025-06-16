import { Component, computed, signal, model } from '@angular/core'

import { FormsModule } from '@angular/forms'
import { StyleService } from '../../../../services/style.service'

interface TodoItem {
  id: number
  title: string
  completed: boolean
  date: string
}

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './to-do.component.html',
  styleUrls: ['../../calendar.component.scss'],
})
export class ToDoComponent {
  // Signal para el output
  todoAdded = model<(todo: TodoItem) => void>()

  // Signals para el estado interno
  todos = signal<TodoItem[]>([])
  newTodoTitle = signal('')
  newTodoDate = signal('')

  currentStyle = computed(() => this.styleService.currentStyle())

  constructor(private styleService: StyleService) {}

  addTodo() {
    if (this.newTodoTitle() && this.newTodoDate()) {
      const newTodo: TodoItem = {
        id: Date.now(),
        title: this.newTodoTitle(),
        completed: false,
        date: this.newTodoDate(),
      }

      this.todos.update((todos) => [...todos, newTodo])
      this.todoAdded()?.(newTodo)

      this.newTodoTitle.set('')
      this.newTodoDate.set('')
    }
  }

  toggleTodo(todo: TodoItem) {
    this.todos.update((todos) =>
      todos.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    )
  }

  deleteTodo(todo: TodoItem) {
    this.todos.update((todos) => todos.filter((t) => t.id !== todo.id))
  }
}
