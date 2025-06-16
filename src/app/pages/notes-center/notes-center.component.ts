import { Component, ViewChild } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { NotesComponent } from './components/notes/notes.component';
import { ControlBarComponent } from './components/control-bar/control-bar.component';
import { CommonModule } from '@angular/common';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

@Component({
  selector: 'app-notes-center',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, NotesComponent, ControlBarComponent],
  templateUrl: './notes-center.component.html',
  styleUrl: './notes-center.component.scss'
})
export class NotesCenterComponent {
  @ViewChild(NotesComponent) notesComponent!: NotesComponent;

  onNoteAdded(note: Note) {
    this.notesComponent.addNote(note);
  }
}
