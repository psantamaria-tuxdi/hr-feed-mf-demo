import { Component } from '@angular/core';

@Component({
    selector: 'hr-like-list-skeleton',
    standalone: true,
    template: `
        <div
            class="tw-mx-2 tw-my-4 tw-flex tw-w-full tw-animate-pulse tw-items-center"
        >
            <div
                class="tw-mr-4 tw-h-9 tw-w-9 tw-rounded-full tw-bg-gray-300"
            ></div>
            <div class="tw-flex tw-flex-col tw-gap-2">
                <div>
                    <div
                        class="tw-h-4 tw-w-48 tw-rounded-2xl tw-bg-gray-300"
                    ></div>
                </div>
                <div>
                    <div
                        class="tw-h-4 tw-w-40 tw-rounded-2xl tw-bg-gray-300"
                    ></div>
                </div>
            </div>
        </div>

        <hr class="tw-my-2 tw-animate-pulse tw-border-b" />

        <div
            class="tw-mx-2 tw-my-4 tw-flex tw-w-full tw-animate-pulse tw-items-center"
        >
            <div
                class="tw-mr-4 tw-h-9 tw-w-9 tw-rounded-full tw-bg-gray-300"
            ></div>
            <div class="tw-flex tw-flex-col tw-gap-2">
                <div>
                    <div
                        class="tw-h-4 tw-w-48 tw-rounded-2xl tw-bg-gray-300"
                    ></div>
                </div>
                <div>
                    <div
                        class="tw-h-4 tw-w-40 tw-rounded-2xl tw-bg-gray-300"
                    ></div>
                </div>
            </div>
        </div>

        <hr class="tw-my-2 tw-animate-pulse tw-border-b" />
    `,
    imports: [],
})
export class LieListSkeletonComponent {}
