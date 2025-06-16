import { Component, computed, signal } from '@angular/core';
import { StyleService } from '../../../../services/style.service';
import { CommonModule } from '@angular/common';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes.component.html',
  styleUrls: ['../../../notes-center/notes-center.component.scss', './notes.component.scss']
})
export class NotesComponent {
  currentStyle = computed(() => this.styleService.currentStyle())
  notes = signal<Note[]>([])

  constructor(private styleService: StyleService) {}

  addNote(note: Note) {
    this.notes.update(notes => [note, ...notes])
  }
}
