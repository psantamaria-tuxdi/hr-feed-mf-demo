import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
// import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'employer/HR-social-media' },

    // {
    //     path: 'employer/HR-social-media',
    //     loadChildren: () => import('app/modules/profile/profile.routes'),
    // },

    {
        path: 'employer/HR-social-media',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        // canActivateChild: [AuthGuard],
        children: [
            {
                canActivate: [AuthGuard],
                path: '',
                loadChildren: () => import('app/modules/feed/feed.routes'),
                pathMatch: 'full',
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import('app/modules/profile/profile.routes'),
            },
        ],
    },

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
