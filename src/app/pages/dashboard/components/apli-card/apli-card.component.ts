import { Component, input } from '@angular/core'

@Component({
  selector: 'app-apli-card',
  imports: [],
  templateUrl: './apli-card.component.html',
  styleUrls: ['../../../../../assets/pages/dashboard/_dashboard.scss'],
})
export class ApliCardComponent {
  // Componente hijo, los datos se pasan desde el componente padre.
  // Se usa input para recibir los datos desde el componente padre.
  title = input('')
  image = input('')
  description = input('')
}
