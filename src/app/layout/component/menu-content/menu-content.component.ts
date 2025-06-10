import { Component, HostBinding, OnInit, OnDestroy, input } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { Subscription } from 'rxjs'
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
          visibility: 'hidden',
          opacity: 0,
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          visibility: 'visible',
          opacity: 1,
        })
      ),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
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
        if (value.key !== this.key && !value.key.startsWith(this.key + '-')) {
          this.active = false
        }
      }
    )

    this.menuResetSubscription = this.layoutService.resetSource$.subscribe(
      () => {
        this.active = false
      }
    )
  }

  ngOnInit() {
    const parentKey = this.parentKey()
    this.key = parentKey ? parentKey + '-' + this.index() : String(this.index())
  }

  itemClick(event: Event) {
    event.stopPropagation()
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
      this.layoutService.onMenuStateChange({ key: this.key })
    }
  }

  get submenuAnimation() {
    return this.active ? 'expanded' : 'collapsed'
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active
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
