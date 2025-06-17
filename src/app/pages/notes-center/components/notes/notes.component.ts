import { Component, computed, input, signal } from '@angular/core';
import { StyleService } from '../../../../services/style.service';
import { CommonModule } from '@angular/common';
import { NotesMenuComponent } from '../notes-menu/notes-menu.component';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, NotesMenuComponent],
  templateUrl: './notes.component.html',
  styleUrls: ['../../../notes-center/notes-center.component.scss', './notes.component.scss']
})
export class NotesComponent {
  currentStyle = computed(() => this.styleService.currentStyle())
  notes = signal<Note[]>([])
  // input para filtrar las notas importantes
  filterImportant = input<boolean>()

  constructor(private styleService: StyleService) {}

  addNote(note: Note) {
    this.notes.update(notes => [note, ...notes])
  }

  selectImportant(id: number) {
    console.log('Seleccionar nota importante con ID:', id);
    this.notes.update(notes =>
      notes.map(note =>
        note.id === id ? { ...note, isImportant: !note.isImportant } : note
      )
    )
  }
  
  editNote(id: number) {
    console.log('Editar nota con ID:', id);
  }
  
  deleteNote(id: number) {
    this.notes.update(notes => notes.filter(note => note.id !== id))
  }

  readonly filteredNotes = computed(() => {
    const allNotes = this.notes();
    return this.filterImportant() ? allNotes.filter(n => n.isImportant) : allNotes;
  });
}
