import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationRef,
  DoBootstrap,
  inject,
  Injector,
  isDevMode,
  NgModule,
  provideAppInitializer,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { LuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  RouterModule,
  RouterOutlet,
  withInMemoryScrolling,
} from '@angular/router';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { provideFuse } from '../@fuse';
import { appRoutes } from './app.routes';
import { provideIcons } from './core/icons/icons.provider';
import { TranslocoHttpLoader } from './core/transloco/transloco.http-loader';
import { AppComponent } from './app.component';
import { MockApiService } from './mock-api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterOutlet,
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
    ),

    // Material Date Adapter
    {
      provide: DateAdapter,
      useClass: LuxonDateAdapter,
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'D',
        },
        display: {
          dateInput: 'DDD',
          monthYearLabel: 'LLL yyyy',
          dateA11yLabel: 'DD',
          monthYearA11yLabel: 'LLLL yyyy',
        },
      },
    },

    // Transloco Config
    // provideTransloco({
    //   config: {
    //     availableLangs: [
    //       {
    //         id: 'en',
    //         label: 'English',
    //       },
    //     ],
    //     defaultLang: 'en',
    //     fallbackLang: 'en',
    //     reRenderOnLangChange: true,
    //     prodMode: !isDevMode(),
    //   },
    //   loader: TranslocoHttpLoader,
    // }),
    // provideAppInitializer(() => {
    //   const translocoService = inject(TranslocoService);
    //   const defaultLang = translocoService.getDefaultLang();
    //   translocoService.setActiveLang(defaultLang);

    //   return firstValueFrom(translocoService.load(defaultLang));
    // }),

    // Fuse
    // provideAuth(),
    provideIcons(),
    provideFuse({
      mockApi: {
          delay: 0,
          service: MockApiService,
      },
      fuse: {
        layout: 'empty',
        scheme: 'tw-light',
        screens: {
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1440px',
        },
        theme: 'theme-default',
        themes: [
          {
            id: 'theme-default',
            name: 'Default',
          },
          {
            id: 'theme-brand',
            name: 'Brand',
          },
          {
            id: 'theme-teal',
            name: 'Teal',
          },
          {
            id: 'theme-rose',
            name: 'Rose',
          },
          {
            id: 'theme-purple',
            name: 'Purple',
          },
          {
            id: 'theme-amber',
            name: 'Amber',
          },
        ],
      },
    }),
  ],
  bootstrap: [],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('mf-hr-root', ce);

    // TODO bootstrap in dev mode only
    // Uncomment the following line to bootstrap the app and run it by itself outside the host app
    // appRef.bootstrap(AppComponent);
  }
}
