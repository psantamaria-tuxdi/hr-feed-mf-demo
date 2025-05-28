import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
// import { AuthGuard } from 'app/core/auth/guards/auth.guard';
// import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    // { path: '', pathMatch: 'full', redirectTo: 'profile' },

    // No layout
    {
        path: 'profile',
        loadChildren: () => import('app/modules/profile/profile.routes'),
    },
    // Empty layout
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'profile/e',
                loadChildren: () =>
                    import('app/modules/profile/profile.routes'),
            },
        ],
    },
    // Modern layout
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'modern',
        },
        resolve: {
            initialData: initialDataResolver,
        },
        children: [
            {
                path: 'profile/m',
                loadChildren: () =>
                    import('app/modules/profile/profile.routes'),
            },
        ],
    },
];
