import { Component, computed, input, output, signal } from '@angular/core';
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

  readonly noteEdited = output<Note>()
  // input para filtrar las notas importantes
  // se inicializa en false para mostrar todas las notas.
  // se recibe del componente padre. Actualiza solo cuando el componente padre cambia.
  // 3. tercer paso del flujo de datos.
  filterImportant = input<boolean>()


  // Array de colores claros correspondientes
  lightColors = [
    { label: 'Red', value: '#FBF2EF' },
    { label: 'Green', value: '#E6FFFA' },
    { label: 'Blue', value: '#ECF8FF' },
    { label: 'Yellow', value: '#FEF5E5' },
    { label: 'Purple', value: '#EEF3FF' },
    { label: 'Gray', value: '#F8F8F8' },
  ]

  // Array de colores originales para mapear
  colorOptions = [
    { label: 'Red', value: '#FA896B' },
    { label: 'Green', value: '#13DEB9' },
    { label: 'Blue', value: '#44B7F7' },
    { label: 'Yellow', value: '#FFAE1F' },
    { label: 'Purple', value: '#5D87FF' },
    { label: 'Gray', value: '#A0AEC0' },
  ]

  constructor(private styleService: StyleService) {}

  addNote(note: Note) {
    this.notes.update(notes => {
      const index = notes.findIndex(n => n.id === note.id);
      let newNotes;
      if (index !== -1) {
        // se agrega esta lógica para reemplazar la nota existente (edicion).
        newNotes = [...notes]; // copia de la nota existente.
        newNotes[index] = note; // se reemplaza la nota con el index encontrado con la nota recibida como parametro
      } else {
        // Agregar nueva nota
        newNotes = [note, ...notes];
      }
      // limitar a máximo 12 notas
      return newNotes.slice(0, 12);
    });
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
    this.notes.update(notes => {
      const noteToEdit = notes.find(note => note.id === id)
      if(noteToEdit){
        this.noteEdited.emit(noteToEdit)
      }
      return notes
    })
  }
  
  deleteNote(id: number) {
    this.notes.update(notes => notes.filter(note => note.id !== id))
  }


  // 4. cuarto paso del flujo de datos.
  // se calcula el valor de filteredNotes.
  // se actualiza solo cuando el valor de filterImportant cambia.
  readonly filteredNotes = computed(() => {
    const allNotes = this.notes();
    return this.filterImportant() ? allNotes.filter(n => n.isImportant) : allNotes;
  });

  getNoteColor(color: string) {
    return color
  }

  // Método para obtener el color claro correspondiente
  getLightColor(color: string): string {
    const colorIndex = this.colorOptions.findIndex(option => option.value === color);
    if (colorIndex !== -1) {
      return this.lightColors[colorIndex].value;
    }
    return '#ffffff'; // Color por defecto si no se encuentra
  }
}
