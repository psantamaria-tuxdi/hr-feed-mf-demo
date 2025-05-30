import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'hr-feed-app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        '../styles/splash-screen.css',
        '../styles/inter.css',
        '../@fuse/styles/tailwind.scss',
        '../@fuse/styles/themes.scss',
        '../styles/vendors.scss',
        '../@fuse/styles/main.scss',
        '../styles/styles.scss',
        '../styles/tailwind.scss',
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: false,
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor() {}
}
