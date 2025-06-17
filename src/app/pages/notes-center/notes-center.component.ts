import { Component, signal, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { NotesComponent } from './components/notes/notes.component';
import { ControlBarComponent } from './components/control-bar/control-bar.component';
import { CommonModule } from '@angular/common';
import { Note } from './models/note.model';

@Component({
  selector: 'app-notes-center',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, NotesComponent, ControlBarComponent],
  templateUrl: './notes-center.component.html',
  styleUrl: './notes-center.component.scss'
})
export class NotesCenterComponent {
  @ViewChild(NotesComponent) notesComponent!: NotesComponent;
  
  // signal para filtrar las notas importantes
  filterImportant = signal(false);
  onNoteAdded(note: Note) {
    this.notesComponent.addNote(note);
  }

  onShowAllNotes() {
    this.filterImportant.set(false);
  }

  onToggleImportantNotes() {
    this.filterImportant.set(true);
  }
}
