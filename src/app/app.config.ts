import { ApplicationConfig } from '@angular/core'
import Aura from '@primeng/themes/aura'
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router'
import { provideHttpClient, withFetch } from '@angular/common/http'

import { routes } from './app.routes'
import { providePrimeNG } from 'primeng/config'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withEnabledBlockingInitialNavigation()
    ),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } },
    }),
  ],
}
