import { Component, HostBinding, OnInit, OnDestroy, input } from '@angular/core'
import { NavigationEnd, Router, RouterModule } from '@angular/router'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { CommonModule } from '@angular/common'
import { RippleModule } from 'primeng/ripple'
import { MenuItem } from 'primeng/api'
import { LayoutService } from '../../service/layout.service'
@Component({
  selector: 'app-menu-content',
  standalone: true,
  imports: [CommonModule, RouterModule, RippleModule],
  templateUrl: './menu-content.component.html',
  animations: [
    trigger('children', [
      state(
        'collapsed',
        style({
          height: '0',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
        })
      ),
      transition(
        'collapsed <=> expanded',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ),
    ]),
  ],
  providers: [LayoutService],
})
export class AppMenuContentComponent implements OnInit, OnDestroy {
  item = input.required<MenuItem>()
  index = input.required<number>()
  root = input.required<boolean>()
  parentKey = input.required<string>()

  active = false
  menuSourceSubscription: Subscription
  menuResetSubscription: Subscription
  key = ''

  constructor(
    public router: Router,
    private layoutService: LayoutService
  ) {
    this.menuSourceSubscription = this.layoutService.menuSource$.subscribe(
      (value) => {
        Promise.resolve(null).then(() => {
          if (value.routeEvent) {
            this.active =
              value.key === this.key || value.key.startsWith(this.key + '-')
                ? true
                : false
          } else {
            if (
              value.key !== this.key &&
              !value.key.startsWith(this.key + '-')
            ) {
              this.active = false
            }
          }
        })
      }
    )

    this.menuResetSubscription = this.layoutService.resetSource$.subscribe(
      () => {
        this.active = false
      }
    )

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.item().routerLink) {
          this.updateActiveStateFromRoute()
        }
      })
  }

  ngOnInit() {
    const parentKey = this.parentKey()
    this.key = parentKey ? parentKey + '-' + this.index() : String(this.index())

    if (this.item().routerLink) {
      this.updateActiveStateFromRoute()
    }
  }

  updateActiveStateFromRoute() {
    const activeRoute = this.router.isActive(this.item().routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    })

    if (activeRoute) {
      this.layoutService.onMenuStateChange({ key: this.key, routeEvent: true })
    }
  }

  itemClick(event: Event) {
    const item = this.item()
    if (item.disabled) {
      event.preventDefault()
      return
    }

    if (item.command) {
      item.command({ originalEvent: event, item: item })
    }

    if (item.items) {
      this.active = !this.active
    }

    this.layoutService.onMenuStateChange({ key: this.key })
  }

  get submenuAnimation() {
    return this.root() ? 'expanded' : this.active ? 'expanded' : 'collapsed'
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root()
  }

  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe()
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe()
    }
  }
}
