import { Component, computed, signal, output, ViewChild } from '@angular/core';
import { StyleService } from '../../../../services/style.service';
import { FormsModule } from '@angular/forms';
import { NotesMenuComponent } from '../notes-menu/notes-menu.component';

interface Note {
  id: number
  title: string
  content: string
  createdAt: Date
  isImportant: boolean
}


@Component({
  selector: 'app-control-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss'
})
export class ControlBarComponent {
  @ViewChild(NotesMenuComponent) notesMenuComponent!: NotesMenuComponent
  currentStyle = computed(() => this.styleService.currentStyle())
  constructor(private styleService: StyleService) {}

  // output para mostrar todas las notas
  // se llama cuando se hace click en el botón de "Todas las notas".
  // se emite el valor de filterImportant al componente padre. 
  readonly showAllNotes = output<void>()
  readonly showImportantNotes = output<void>()


  noteAdded = output<Note>()

  notes = signal<Note[]>([])
  newNoteTitle = signal('')
  newNoteContent = signal('')
  isModalOpen = signal(false)

  openModal() {
    this.isModalOpen.set(true)
  }

  closeModal() {
    this.isModalOpen.set(false)
    this.newNoteTitle.set('')
    this.newNoteContent.set('')
  }

  addNote() {
    if (this.newNoteTitle() && this.newNoteContent()) {
      const newNote: Note = {
        id: Date.now(),
        title: this.newNoteTitle(),
        content: this.newNoteContent(),
        createdAt: new Date(),
        isImportant: false,
      }

      this.noteAdded.emit(newNote)
      this.closeModal()
    }
  }
}
