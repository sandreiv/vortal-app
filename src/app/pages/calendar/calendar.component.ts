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
    { label: 'Red', value: '#F56565' },
    { label: 'Green', value: '#68D391' },
    { label: 'Blue', value: '#63B3ED' },
    { label: 'Yellow', value: '#FBD38D' },
    { label: 'Purple', value: '#B794F4' },
    { label: 'Gray', value: '#A0AEC0' },
  ]

  isEditingTodoFn() {
    return this.isEditingTodo()
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

      // 🔁 Si es tarea, actualizar también en lista
      if (isTodo) {
        const todoId = selected.extendedProps['todoId']
        this.todos.update((items) =>
          items.map((t) =>
            t.id === todoId ? { ...t, title: data.title, date: data.start, color: data.color } : t
          )
        )
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
    this.todos.update((items) => [...items, todo])
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

  private formatDate(date: Date | null): string {
    return date ? date.toISOString().split('T')[0] : ''
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
            clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom

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
          this.todos.update((items) =>
            items.map((t) => (t.id === todoId ? { ...t, date: newDate } : t))
          )
        }
      },

      eventResize: (info) => {
        const isTodo = info.event.extendedProps['isTodo']
        if (isTodo) {
          info.revert()
          alert('No puedes expandir eventos de la lista de tareas durante varios días.')
        }
      },
    })

    this.calendar.render()
  }

  public removeEventByTodoId(todoId: number): void {
    const event = this.calendar.getEvents().find(
      (e) => e.extendedProps['todoId'] === todoId
    )
    if (event) {
      event.remove()
      this.showDeleteToast()
    }
  }
}
