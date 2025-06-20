import { Component, computed, signal, output, ViewChild} from '@angular/core';
import { StyleService } from '../../../../services/style.service';
import { FormsModule } from '@angular/forms';
import { NotesMenuComponent } from '../notes-menu/notes-menu.component';
import { NgClass } from '@angular/common';
import { NgStyle } from '@angular/common';
interface Note {
  id: number
  title: string
  content: string
  createdAt: Date
  isImportant: boolean
  color: string
}


@Component({
  selector: 'app-control-bar',
  standalone: true,
  imports: [FormsModule, NgClass, NgStyle],
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

  colorOptions = [
    { label: 'Red', value: '#FA896B' },
    { label: 'Green', value: '#13DEB9' },
    { label: 'Blue', value: '#44B7F7' },
    { label: 'Yellow', value: '#FFAE1F' },
    { label: 'Purple', value: '#5D87FF' },
    { label: 'Gray', value: '#A0AEC0' },
  ]

  lightColors = [
    { label: 'Red', value: '#FBF2EF' },
    { label: 'Green', value: '#E6FFFA' },
    { label: 'Blue', value: '#ECF8FF' },
    { label: 'Yellow', value: '#FEF5E5' },
    { label: 'Purple', value: '#EEF3FF' },
    { label: 'Gray', value: '#F8F8F8' },
  ]


  noteAdded = output<Note>()

  // señales para editar notas
  isEditing = signal(false)
  // se agrega para guardar el id de la nota a editar
  editingNoteId = signal<number | null>(null)
  

  notes = signal<Note[]>([])
  noteTitle = signal('')
  noteContent = signal('')
  noteColor = signal('')
  isModalOpen = signal(false)

  openModal() {
    this.isModalOpen.set(true)
  }

  // se recibe la nota a editar por el id desde el padre.
  editNote(note: Note) {
    this.isModalOpen.set(true)
    this.noteTitle.set(note.title)
    this.noteContent.set(note.content)
    this.noteColor.set(note.color)
    this.isEditing.set(true) // se activa el modo de edición al momento de ser llamada la función 
    this.editingNoteId.set(note.id)
  }

  

  closeModal() {
    this.isModalOpen.set(false)
    this.noteTitle.set('')
    this.noteContent.set('')
  }

  addNote() {
    // se trabajan dos casos 
    if (this.isEditing() && this.editingNoteId() !== null) {
      const noteEdited: Note = {
        id: this.editingNoteId()!,
        title: this.noteTitle(),
        content: this.noteContent(),
        createdAt: new Date(), 
        isImportant: false,
        color: this.noteColor(),
      }
      this.noteAdded.emit(noteEdited)
      this.isEditing.set(false)
      this.editingNoteId.set(null)
      this.closeModal()
      return
    }
    if (this.noteTitle() && this.noteContent() && !this.isContentTooLong()) {
      const newNote: Note = {
        id: Date.now(),
        title: this.noteTitle(),
        content: this.noteContent(),
        createdAt: new Date(),
        isImportant: false,
        color: this.noteColor(),
      }
      this.noteAdded.emit(newNote)
      this.closeModal()
    }
  }

  // lógica para los botones
  selectedButton = signal<'all' | 'important' | null>('all');

  handleAllNotes() {
    this.selectedButton.set('all');
    this.showAllNotes.emit();
  }
  
  handleImportantNotes() {
    this.selectedButton.set('important');
    this.showImportantNotes.emit();
  }

  selectColor(color: string) {
    this.noteColor.set(color)
  }

  onContentInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    const value = target.value;
    if (value.length > 200) {
      this.noteContent.set(value.substring(0, 200));
    }
  }

  isContentTooLong(): boolean {
    return this.noteContent().length > 200;
  }
}
