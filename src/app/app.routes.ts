import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
// import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { environment } from 'environments/environment';

const hrSocialMediaPaths =
  environment.name === 'humanage'
    ? // HUMANAGE:
      ['employee/HR-social-media', 'employer/HR-social-media']
    : // AXTON:
      ['employer/HR-social-media'];

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // Redirect empty path to '/example'
  //   { path: '', pathMatch: 'full', redirectTo: 'employer/HR-social-media' },
  ...hrSocialMediaPaths.map((path) => ({
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
