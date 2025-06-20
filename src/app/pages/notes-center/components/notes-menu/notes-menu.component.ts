import { Component, computed, input, output, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu'
import { ButtonModule } from 'primeng/button'
@Component({
  selector: 'app-notes-menu',
  imports: [MenuModule, ButtonModule],
  templateUrl: './notes-menu.component.html',
  styleUrl: './notes-menu.component.scss'
})
export class NotesMenuComponent {
  
  // input para el id de la nota
  noteId = input<number>()

  readonly editMode = output<number>()
  readonly deleteMode = output<number>()
  readonly importantMode = output<number>()

  readonly menuItems = computed<MenuItem[]>(() => [
    {
      label: 'Importante',
      icon: 'pi pi-star',
      command: () => {
        const id = this.noteId();
        if (id !== undefined) this.importantMode.emit(id);
      },
    },
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => {
        const id = this.noteId();
        if (id !== undefined) this.editMode.emit(id);
      },
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => {
        const id = this.noteId();
        if (id !== undefined) this.deleteMode.emit(id);
      },
    }
  ])

  editNoteId = input<number | null>();
  isEditMode = signal(false);
}
