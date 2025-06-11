import { Routes } from '@angular/router'

import { AppLayoutComponent } from './layout/app.layout'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { DependencyContactsComponent } from './pages/dependency-contacts/dependency-contacts.component'
import { FacultyContactComponent } from './pages/dependency-contacts/components/faculty-contact/faculty-contact.component'
import { AdminContactComponent } from './pages/dependency-contacts/components/admin-contact/admin-contact.component'
import { ViceContactComponent } from './pages/dependency-contacts/components/vice-contact/vice-contact.component'
import { CalendarComponent } from './pages/calendar/calendar'; 


export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'contact-info',
        component: DependencyContactsComponent,
        children: [
          { path: '', redirectTo: 'facultades', pathMatch: 'full' },
          { path: 'facultades', component: FacultyContactComponent },
          {
            path: 'oficinas-administrativas',
            component: AdminContactComponent,
          },
          { path: 'vicerrectorias', component: ViceContactComponent },
        ],
      },

      { path: 'calendar', component: CalendarComponent },


    ],
  },
]
