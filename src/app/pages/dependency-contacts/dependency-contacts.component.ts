import { Component, OnInit } from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { AdminContactComponent } from './components/admin-contact/admin-contact.component'
import { filter } from 'rxjs/operators'
import { CommonModule } from '@angular/common'

interface ContactInfo {
  title: string
  image: string
  email: string
  phone: string
  facebook?: string
  instagram?: string
  twitter?: string
  website?: string
}

@Component({
  selector: 'app-dependency-contacts',
  standalone: true,
  imports: [RouterModule, AdminContactComponent, CommonModule],
  templateUrl: './dependency-contacts.component.html',
  styleUrls: ['./dependency-contacts.component.scss'],
})
export class DependencyContactsComponent implements OnInit {
  currentContactInfo: ContactInfo[] = []

  facultyContactInfo: ContactInfo[] = [
    {
      title: 'Facultad de Ingenierías y Arquitectura',
      image: 'assets/pages/img/secretariageneral.png',
      email: 'ingenieria@unipamplona.edu.co',
      phone: '3178901234',
      facebook: 'FacultadIngenieriaUnipamplona',
      instagram: 'FacultadIngenieriaUnipamplona',
      twitter: 'FacultadIngenieriaUnipamplona',
      website: 'https://www.unipamplona.edu.co/facultades/ingenieria/',
    },
  ]

  adminContactInfo: ContactInfo[] = [
    {
      title: 'Bienestar universitario',
      image: 'assets/pages/img/bienestar.png',
      email: 'bienestar@univer.edu.co',
      phone: '3178901234',
      facebook: 'Bienestarunipamplona',
      instagram: 'Bienestarunipamplona',
      twitter: 'Bienestarunipamplona',
      website: 'https://www.unipamplona.edu.co/bienestaruniversitario/',
    },
    {
      title: 'Secretaría General',
      image: 'assets/pages/img/secretariageneral.png',
      email: 'secretaria@univer.edu.co',
      phone: '3178901234',
      facebook: 'Secretariaunipamplona',
      instagram: 'Secretariaunipamplona',
      twitter: 'Secretariaunipamplona',
      website: 'https://www.unipamplona.edu.co/secretariageneral/',
    },
    {
      title: 'Oficina de Planeación',
      image: 'assets/pages/img/planeacion.png',
      email: 'planeacion@univer.edu.co',
      phone: '3178901234',
      facebook: 'Planeacionunipamplona',
      instagram: 'Planeacionunipamplona',
      twitter: 'Planeacionunipamplona',
      website: 'https://www.unipamplona.edu.co/planeacion/',
    },
    {
      title: 'Oficina de Planeación',
      image: 'assets/pages/img/planeacion.png',
      email: 'planeacion@univer.edu.co',
      phone: '3178901234',
      facebook: 'Planeacionunipamplona',
      instagram: 'Planeacionunipamplona',
      twitter: 'Planeacionunipamplona',
      website: 'https://www.unipamplona.edu.co/planeacion/',
    },
    {
      title: 'Oficina de Planeación',
      image: 'assets/pages/img/planeacion.png',
      email: 'planeacion@univer.edu.co',
      phone: '3178901234',
      facebook: 'Planeacionunipamplona',
      instagram: 'Planeacionunipamplona',
      twitter: 'Planeacionunipamplona',
      website: 'https://www.unipamplona.edu.co/planeacion/',
    },
    {
      title: 'Oficina de Planeación',
      image: 'assets/pages/img/planeacion.png',
      email: 'planeacion@univer.edu.co',
      phone: '3178901234',
      facebook: 'Planeacionunipamplona',
      instagram: 'Planeacionunipamplona',
      twitter: 'Planeacionunipamplona',
      website: 'https://www.unipamplona.edu.co/planeacion/',
    },
    {
      title: 'Oficina de Planeación',
      image: 'assets/pages/img/planeacion.png',
      email: 'planeacion@univer.edu.co',
      phone: '3178901234',
      facebook: 'Planeacionunipamplona',
      instagram: 'Planeacionunipamplona',
      twitter: 'Planeacionunipamplona',
      website: 'https://www.unipamplona.edu.co/planeacion/',
    },
  ]

  viceContactInfo: ContactInfo[] = [
    {
      title: 'Vicerrectoría Académica',
      image: 'assets/pages/img/secretariageneral.png',
      email: 'vicerrectoria@unipamplona.edu.co',
      phone: '3178901234',
      facebook: 'VicerrectoriaAcademicaUnipamplona',
      instagram: 'VicerrectoriaAcademicaUnipamplona',
      twitter: 'VicerrectoriaAcademicaUnipamplona',
      website: 'https://www.unipamplona.edu.co/vicerrectoria-academica/',
    },
  ]

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateContactInfo(event.url)
      })

    // Inicializar con la ruta actual
    this.updateContactInfo(this.router.url)
  }

  private updateContactInfo(url: string) {
    if (url.includes('facultades')) {
      this.currentContactInfo = this.facultyContactInfo
    } else if (url.includes('oficinas-administrativas')) {
      this.currentContactInfo = this.adminContactInfo
    } else if (url.includes('vicerrectorias')) {
      this.currentContactInfo = this.viceContactInfo
    }
  }
}
