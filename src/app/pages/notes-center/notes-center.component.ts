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
  
  // signal para filtrar las notas importantes. Componente padre.
  // se inicializa en false para mostrar todas las notas.
  // 1. primer paso del flujo de datos.
  filterImportant = signal(false);

  onNoteAdded(note: Note) {
    this.notesComponent.addNote(note);
  }

  // se llama cuando se hace click en el botón de "Todas las notas".
  // se setea el valor de filterImportant a false para mostrar todas las notas.
  // 2. segundo paso del flujo de datos. 
  onShowAllNotes() {
    this.filterImportant.set(false);
  }

  onShowImportantNotes() {
    this.filterImportant.set(true);
  }
}
