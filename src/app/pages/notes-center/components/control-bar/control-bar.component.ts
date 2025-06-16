import { Component, computed, signal, output } from '@angular/core';
import { StyleService } from '../../../../services/style.service';
import { FormsModule } from '@angular/forms';

interface Note {
  id: number
  title: string
  content: string
  createdAt: Date
}

@Component({
  selector: 'app-control-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss'
})
export class ControlBarComponent {
  currentStyle = computed(() => this.styleService.currentStyle())
  constructor(private styleService: StyleService) {}

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
      }

      this.noteAdded.emit(newNote)
      this.closeModal()
    }
  }
}
