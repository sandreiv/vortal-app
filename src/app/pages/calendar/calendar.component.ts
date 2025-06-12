import { Component, AfterViewInit, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Calendar, EventInput } from '@fullcalendar/core'
import { EventApi } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { NgStyle } from '@angular/common'
import { CommonModule } from '@angular/common'
import { Modal } from 'bootstrap'
import { CalendarAppComponent } from './components/calendar-app/calendar-app.component'
import { ToDoComponent } from './components/to-do/to-do.component'

interface TodoItem {
  id: number
  title: string
  completed: boolean
  date: string
}

interface EventData {
  title: string
  start: string
  end: string
  color: string
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
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

  public updateEventTitle(title: string): void {
    this.newEvent.update((event) => ({ ...event, title }))
  }

  public updateEventStart(start: string): void {
    this.newEvent.update((event) => ({ ...event, start }))
  }

  public updateEventEnd(end: string): void {
    this.newEvent.update((event) => ({ ...event, end }))
  }

  public addEvent(): void {
    if (!this.newEvent().title || !this.newEvent().start) return

    if (this.selectedEvent()) {
      // Editar
      const event = this.selectedEvent()
      if (event) {
        event.setProp('title', this.newEvent().title)
        event.setStart(this.newEvent().start)
        event.setEnd(this.newEvent().end || null)
        event.setProp('backgroundColor', this.newEvent().color)
        event.setProp('borderColor', this.newEvent().color)
      }
    } else {
      const event: EventInput = {
        title: this.newEvent().title,
        start: this.newEvent().start,
        end: this.newEvent().end || undefined,
        color: this.newEvent().color || '#63B3ED',
        allDay: true,
      }
      this.calendar.addEvent(event)
    }

    this.closeModal()
  }

  private closeModal(): void {
    this.newEvent.set({
      title: '',
      start: '',
      end: '',
      color: '',
    })
    this.selectedEvent.set(null)

    const modalEl = document.getElementById('addEventModal')
    if (modalEl) {
      const modal = Modal.getInstance(modalEl)
      modal?.hide()
    }
  }

  private formatDate(date: Date | null): string {
    return date ? date.toISOString().split('T')[0] : ''
  }

  ngAfterViewInit(): void {
    const calendarEl = document.getElementById('calendar')

    if (calendarEl) {
      this.calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        height: 'auto',
        selectable: true,
        events: [
          {
            title: 'Event Conf.',
            start: '2025-06-01',
            color: '#F56565',
            allDay: true,
          },
          {
            title: 'Seminar #4',
            start: '2025-06-06',
            end: '2025-06-08',
            color: '#B2F5EA',
            allDay: true,
          },
        ],
        eventClick: (info) => {
          const event = info.event
          this.selectedEvent.set(event)
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
      })

      this.calendar.render()
    }
  }

  public selectColor(color: string): void {
    this.newEvent.update((event) => ({ ...event, color }))
  }

  public onTodoAdded(todo: TodoItem): void {
    const event: EventInput = {
      title: todo.title,
      start: todo.date,
      color: todo.completed ? '#68D391' : '#F56565',
      allDay: true,
      extendedProps: {
        todoId: todo.id,
        isTodo: true,
      },
    }
    this.calendar.addEvent(event)
  }
}
