import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
// import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { environment } from 'environments/environment';

const hrFeedPaths =
  environment.clientName === 'humanage'
    ? // HUMANAGE:
      ['employee/humanage-connect', 'employer/humanage-connect']
    : // AXTON:
      ['hr-feed'];

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // TODO add default redirect
  //   { path: '', pathMatch: 'full', redirectTo: 'employer/HR-social-media' },
  ...hrFeedPaths.map((path) => ({
    path,
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        canActivate: [AuthGuard],
        path: '',
        loadChildren: () => import('app/modules/feed/feed.routes'),
      },
    ],
  })),

  // {
  //     path: '',
  //     component: LayoutComponent,
  //     data: {
  //         layout: 'modern',
  //     },
  //     resolve: {
  //         initialData: initialDataResolver,
  //     },
  //     children: [
  //         {
  //             path: 'employer/HR-social-media',
  //             loadChildren: () =>
  //                 import('app/modules/profile/profile.routes'),
  //         },
  //     ],
  // },
];
