import { Routes } from '@angular/router'

import { AppLayoutComponent } from './layout/app.layout'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { DependencyContactsComponent } from './pages/dependency-contacts/dependency-contacts.component'
import { FacultyContactComponent } from './pages/dependency-contacts/components/faculty-contact/faculty-contact.component'
import { AdminContactComponent } from './pages/dependency-contacts/components/admin-contact/admin-contact.component'
import { ViceContactComponent } from './pages/dependency-contacts/components/vice-contact/vice-contact.component'
import { CalendarComponent } from './pages/calendar/calendar.component'
import { KanbanComponent } from './pages/kanban/kanban.component'
import { NotesCenterComponent } from './pages/notes-center/notes-center.component'

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full', },
      { path: 'home/dashboard', component: DashboardComponent, 
        data: { breadcrumb: [
          { label: 'Home', url: '/dashboard' },
          { label: 'Dashboard', url: '/home/dashboard' }
        ]} 
      },
      {
        path: 'apps/contact-info',
        component: DependencyContactsComponent,
        children: [
          { path: '', redirectTo: 'facultades', pathMatch: 'full' },
          { path: 'facultades', component: FacultyContactComponent, 
            data: { breadcrumb: 'Facultades' }
           },
          {
            path: 'oficinas-administrativas',
            component: AdminContactComponent,
            data: { breadcrumb: 'Oficinas Administrativas' }
          },
          { path: 'vicerrectorias', component: ViceContactComponent,
            data: { breadcrumb: 'Vicerrectorias' }
           },
        ],
        data: { breadcrumb: [
          { label: 'Apps', url: '/apps' },
          { label: 'Contacto', url: '/apps/contact-info' }
        ] },
      },

      { path: 'apps/calendar', component: CalendarComponent, 
        data: { breadcrumb: [
          { label: 'Apps', url: '/apps' },
          { label: 'Calendario', url: '/apps/calendar' }
        ]} 
      },
      { path: 'apps/kanban', component: KanbanComponent, 
        data: { breadcrumb: [
          { label: 'Apps', url: '/apps' },
          { label: 'Progreso de tareas', url: '/apps/kanban' }
        ]} 
      },
      { path: 'apps/notes', component: NotesCenterComponent, 
        data: { breadcrumb: [
          { label: 'Apps', url: '/apps' },
          { label: 'Notas', url: '/apps/notes' }
        ]} 
      },
    ],
  },
]
