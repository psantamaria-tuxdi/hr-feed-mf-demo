import { TextFieldModule } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FuseCardComponent } from '@fuse/components/card';
import { environment } from 'environments/environment.development';

@Component({
    selector: 'hr-create-post',
    imports: [
        FuseCardComponent,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        TextFieldModule,
    ],
    templateUrl: './create-post.component.html',
    host: {
        class: 'tw-w-full',
    },
})
export class CreatePostComponent {
    baseUrl = environment.baseUrl;
}
