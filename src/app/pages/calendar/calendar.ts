import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar, EventInput } from '@fullcalendar/core';
import { EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgStyle } from '@angular/common';
import { CommonModule } from '@angular/common'; // <-- IMPORTANTE
import { Modal } from 'bootstrap';
import { CalendarAppComponent } from './components/calendar-app/calendar-app.component';




@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule, NgStyle, CalendarAppComponent],
})
export class CalendarComponent implements AfterViewInit {

  private calendar!: Calendar;

  public selectedEvent: EventApi | null = null;

  public newEvent = {
    title: '',
    start: '',
    end: '',
    color: ''
  };

  public colorOptions = [
  { label: 'Red', value: '#F56565' },
  { label: 'Green', value: '#68D391' },
  { label: 'Blue', value: '#63B3ED' },
  { label: 'Yellow', value: '#FBD38D' },
  { label: 'Purple', value: '#B794F4' },
  { label: 'Gray', value: '#A0AEC0' }
  ];



  

  public addEvent(): void {
    if (!this.newEvent.title || !this.newEvent.start) return;

    if (this.selectedEvent) {
      // Editar
      this.selectedEvent.setProp('title', this.newEvent.title);
      this.selectedEvent.setStart(this.newEvent.start);
      this.selectedEvent.setEnd(this.newEvent.end || null);
      this.selectedEvent.setProp('backgroundColor', this.newEvent.color);
      this.selectedEvent.setProp('borderColor', this.newEvent.color);
    } else {
      const event: EventInput = {
        title: this.newEvent.title,
        start: this.newEvent.start,
        end: this.newEvent.end || undefined,
        color: this.newEvent.color || '#63B3ED',
        allDay: true
      };
      this.calendar.addEvent(event);
    }

    this.closeModal();
  }

  private closeModal(): void {
    this.newEvent = { title: '', start: '', end: '', color: '' };
    this.selectedEvent = null;

    const modalEl = document.getElementById('addEventModal');
    if (modalEl) {
      const modal = Modal.getInstance(modalEl);
      modal?.hide();
    }
  }

  private formatDate(date: Date | null): string {
    return date ? date.toISOString().split('T')[0] : '';
  }

  ngAfterViewInit(): void {
    const calendarEl = document.getElementById('calendar');

    if (calendarEl) {
      this.calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        height: 'auto',
        selectable: true,
        events: [
          {
            title: 'Event Conf.',
            start: '2025-06-01',
            color: '#F56565',
            allDay: true
          },
          {
            title: 'Seminar #4',
            start: '2025-06-06',
            end: '2025-06-08',
            color: '#B2F5EA',
            allDay: true
          }
        ],
        eventClick: (info) => {
          const event = info.event;
          this.selectedEvent = event;
          this.newEvent = {
            title: event.title,
            start: this.formatDate(event.start),
            end: event.end ? this.formatDate(event.end) : '',
            color: event.backgroundColor
          };

          const modalEl = document.getElementById('addEventModal');
          if (modalEl) {
            const modal = Modal.getOrCreateInstance(modalEl);
            modal.show();
          }
        }
      });

      this.calendar.render();
    }
  }

  public selectColor(color: string): void {
    this.newEvent.color = color;
    console.log('Color seleccionado:', color);
  }

}
