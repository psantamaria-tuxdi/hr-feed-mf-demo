import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, signal, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { FuseCardComponent } from '@fuse/components/card';
import { User } from '../../../../core/user/user.types';

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
})
export class CreatePostComponent {
    // TODO : Replace with logged user signal
    user: Signal<User> = signal({
        id: '1',
        name: 'John Doe',
        email: 'john@doe.com',
        avatar: 'http://localhost:4202/images/avatars/brian-hughes.jpg',
    });
}
