
import { Component, ChangeDetectionStrategy, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule }       from '@angular/router';
import { filter }              from 'rxjs';

interface Crumb { label: string; url: string; }

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule]
})
export class BreadcrumbComponent {
  private router         = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private navEnd = signal<NavigationEnd|undefined>(undefined);
  
  breadcrumbs = computed<Crumb[]>(() => {
    this.navEnd();
    return this.build(this.activatedRoute.root);
  });

  constructor() {
    effect(() => {
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(e => this.navEnd.set(e as NavigationEnd));
    });
  }

  private build(route: ActivatedRoute, url = '', crumbs: Crumb[] = []): Crumb[] {
    for (const child of route.children) {
      const segment = child.snapshot.url.map(s => s.path).join('/');
      if (segment) {
        url += `/${segment}`;
      }
  
      const data = child.snapshot.data['breadcrumb'];
  
      if (data) {
        if (typeof data === 'string') {
          crumbs.push({ label: data, url });
        } else if (Array.isArray(data)) {
          for (const item of data) {
            crumbs.push(item);
          }
        }
      }
  
      return this.build(child, url, crumbs);
    }
    return crumbs;
  }
}