import { Component } from '@angular/core';
import { FuseCardComponent } from '@fuse/components/card';

@Component({
    selector: 'hr-post-skeleton',
    standalone: true,
    template: `
        <fuse-card
            class="tw-mt-8 tw-flex tw-w-full tw-max-w-140 tw-flex-col"
            #expandableCard="fuseCard"
        >
            <!-- Header -->
            <div
                class="tw-mx-6 tw-mb-1 tw-mt-6 tw-flex tw-items-center sm:tw-mx-8 tw-animate-pulse"
            >
                <div
                    class="tw-mr-4 tw-h-10 tw-w-10 tw-rounded-full tw-bg-gray-300"
                ></div>
                <div class="tw-flex tw-flex-col tw-gap-1">
                    <div
                        class="tw-h-3 tw-w-24 tw-rounded-2xl tw-bg-gray-300"
                    ></div>
                    <div
                        class="tw-h-3 tw-w-16 tw-rounded-2xl tw-bg-gray-300"
                    ></div>
                </div>
            </div>

            <!-- Content -->
            <div class="tw-m-6 tw-h-5 sm:tw-mx-8"></div>

            <!-- Actions -->
            <div
                class="tw-mx-3 tw-flex tw-h-10 tw-items-center tw-text-gray-600 sm:tw-mx-5 tw-animate-pulse"
            >
                <div
                    class="tw-ml-6 tw-mr-6 tw-h-3 tw-w-24 tw-rounded-2xl tw-bg-gray-300"
                ></div>
                <div
                    class="tw-ml-6 tw-mr-6 tw-h-3 tw-w-24 tw-rounded-2xl tw-bg-gray-300"
                ></div>
            </div>

            <hr class="tw-mx-6 tw-mb-6 tw-mt-4 tw-border-b sm:tw-mx-8" />

            <div
                class="tw-mx-6 tw-mb-4 tw-flex tw-h-10 tw-flex-col tw-justify-end sm:tw-mx-8 sm:tw-mb-6 sm:tw-flex-row sm:tw-items-center tw-animate-pulse"
            >
                <div
                    class="tw-ml-6 tw-mr-6 tw-h-3 tw-w-26 tw-rounded-2xl tw-bg-gray-300"
                ></div>
            </div>
        </fuse-card>
    `,
    imports: [FuseCardComponent],
})
export class PostSkeletonComponent {}
