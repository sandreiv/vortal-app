import { Component, AfterViewInit, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule, NgStyle } from '@angular/common'
import { Calendar, EventInput, EventApi } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { Modal, Toast } from 'bootstrap'
import { CalendarAppComponent } from './components/calendar-app/calendar-app.component'
import { ToDoComponent } from './components/to-do/to-do.component'
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component'
import Swal from 'sweetalert2'

interface TodoItem {
  id: number
  title: string
  completed: boolean
  date: string
  color: string
}

interface EventData {
  title: string
  start: string
  end: string
  color: string
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NgStyle,
    CalendarAppComponent,
    ToDoComponent,
    BreadcrumbComponent,
  ],
})
export class CalendarComponent implements AfterViewInit {
  private calendar!: Calendar

  selectedEvent = signal<EventApi | null>(null)
  isDragging = false
  isEditingTodo = signal(false)
  todos = signal<TodoItem[]>([])

  newEvent = signal<EventData>({
    title: '',
    start: '',
    end: '',
    color: '',
  })

  colorOptions = [
    { label: 'Red', value: '#FA896B' },
    { label: 'Green', value: '#13DEB9' },
    { label: 'Blue', value: '#44B7F7' },
    { label: 'Yellow', value: '#FFAE1F' },
    { label: 'Purple', value: '#5D87FF' },
    { label: 'Gray', value: '#A0AEC0' },
  ]

  isEditingTodoFn() {
    return this.isEditingTodo()
  }

  private formatDate(date: Date | null): string {
    return date ? date.toISOString().split('T')[0] : ''
  }

  private sortTodos(todos: TodoItem[]): TodoItem[] {
    return todos.slice().sort((a, b) => a.date.localeCompare(b.date))
  }

  updateEventTitle(title: string) {
    this.newEvent.update((e) => ({ ...e, title }))
  }

  updateEventStart(start: string) {
    this.newEvent.update((e) => ({ ...e, start }))
  }

  updateEventEnd(end: string) {
    this.newEvent.update((e) => ({ ...e, end }))
  }

  selectColor(color: string) {
    this.newEvent.update((e) => ({ ...e, color }))
  }

  addEvent() {
    const data = this.newEvent()
    const isTodo = this.isEditingTodo()
    if (!data.title || !data.start) return

    const selected = this.selectedEvent()
    if (selected) {
      selected.setProp('title', data.title)
      selected.setStart(data.start)
      selected.setEnd(isTodo ? null : data.end || null)
      selected.setProp('backgroundColor', data.color)
      selected.setProp('borderColor', data.color)

      if (isTodo) {
        const todoId = selected.extendedProps['todoId']
        const updated = this.todos()
          .map((t) =>
            t.id === todoId ? { ...t, title: data.title, date: data.start, color: data.color } : t
          )
        this.todos.set(this.sortTodos(updated))
      }
    } else {
      const event: EventInput = {
        title: data.title,
        start: data.start,
        end: isTodo ? undefined : data.end || undefined,
        color: data.color || '#63B3ED',
        allDay: true,
      }
      this.calendar.addEvent(event)
    }

    this.closeModal()
  }

  onTodoAdded(todo: TodoItem) {
    const updated = [...this.todos(), todo]
    this.todos.set(this.sortTodos(updated))

    const event: EventInput = {
      title: todo.title,
      start: todo.date,
      color: todo.color || '#63B3ED',
      allDay: true,
      extendedProps: {
        todoId: todo.id,
        isTodo: true,
      },
    }

    this.calendar.addEvent(event)
  }

  private closeModal() {
    this.newEvent.set({ title: '', start: '', end: '', color: '' })
    this.selectedEvent.set(null)
    this.isEditingTodo.set(false)

    const modalEl = document.getElementById('addEventModal')
    if (modalEl) {
      const modal = Modal.getInstance(modalEl)
      modal?.hide()
    }
  }

  private showDeleteToast() {
    const toastEl = document.getElementById('deleteToast')
    if (toastEl) {
      const toast = Toast.getOrCreateInstance(toastEl)
      toast.show()
    }
  }

  ngAfterViewInit(): void {
    const calendarEl = document.getElementById('calendar')
    if (!calendarEl) return

    this.calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      events: [],
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },

      eventClick: (info) => {
        const event = info.event
        const isTodo = event.extendedProps['isTodo'] === true

        this.selectedEvent.set(event)
        this.isEditingTodo.set(isTodo)

        this.newEvent.set({
          title: event.title,
          start: this.formatDate(event.start),
          end: event.end ? this.formatDate(event.end) : '',
          color: event.backgroundColor,
        })

        const modalEl = document.getElementById('addEventModal')
        if (modalEl) {
          const modal = Modal.getOrCreateInstance(modalEl)
          modal.show()
        }
      },

      eventDragStart: () => {
        this.isDragging = true
      },

      eventDragStop: (info) => {
        this.isDragging = false

        const trashEl = document.getElementById('trash-bin')
        if (trashEl) {
          const rect = trashEl.getBoundingClientRect()
          const { clientX, clientY } = info.jsEvent
          const isOverTrash =
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom

          if (isOverTrash) {
            const event = info.event
            const todoId = event.extendedProps['todoId']
            const isTodo = event.extendedProps['isTodo']
            event.remove()

            if (isTodo && todoId) {
              this.todos.update((items) => items.filter((t) => t.id !== todoId))
            }

            this.showDeleteToast()
          }
        }
      },

      eventDrop: (info) => {
        const event = info.event
        const newDate = this.formatDate(event.start)

        if (event.extendedProps['isTodo'] && event.extendedProps['todoId']) {
          const todoId = event.extendedProps['todoId']
          const updated = this.todos().map((t) =>
            t.id === todoId ? { ...t, date: newDate } : t
          )
          this.todos.set(this.sortTodos(updated))
        }
      },

      eventResize: (info) => {
        const isTodo = info.event.extendedProps['isTodo']
        if (isTodo) {
          info.revert()
          Swal.fire({
            title: 'No se puede expandir una tarea a varios días.',
            icon: 'error',
          })
        }
      },
    })

    this.calendar.render()
  }

  public removeEventByTodoId(todoId: number): void {
    const event = this.calendar
      .getEvents()
      .find((e) => e.extendedProps['todoId'] === todoId)
    if (event) {
      event.remove()
      this.showDeleteToast()
    }
    this.todos.update((items) => items.filter((t) => t.id !== todoId));
  }
}
