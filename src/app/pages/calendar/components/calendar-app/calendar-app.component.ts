import { Component, computed } from "@angular/core";
import { StyleService } from "../../../../services/style.service";
import { Modal } from "bootstrap";
import { Calendar, EventApi } from "@fullcalendar/core/index.js";

@Component({
  selector: 'app-calendar-app',
  templateUrl: './calendar-app.component.html',
  styleUrls: ['../../calendar.scss']
})
export class CalendarAppComponent {
    currentStyle = computed(() => this.styleService.currentStyle())
    private calendar!: Calendar;

  public selectedEvent: EventApi | null = null;

  public newEvent = {
    title: '',
    start: '',
    end: '',
    color: ''
  };

  constructor(private styleService: StyleService) {}

  public openAddEventModal(): void {
    this.selectedEvent = null;
    this.newEvent = { title: '', start: '', end: '', color: '' };

    const modalEl = document.getElementById('addEventModal');
    if (modalEl) {
      const modal = new Modal(modalEl);
      modal.show();
    }
  }

}