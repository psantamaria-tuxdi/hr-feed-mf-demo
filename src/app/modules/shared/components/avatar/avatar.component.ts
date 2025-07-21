import { Component, input } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { Author } from '../../types/author.types';
import { AvatarModule } from 'ngx-avatars';
import { NgClass } from '@angular/common';

@Component({
  selector: 'hr-avatar',
  templateUrl: './avatar.component.html',
  standalone: true,
  imports: [NgClass, AvatarModule]
})
export class AvatarComponent {
  data = input.required<User | Author>();
  size = input.required<number>();
  ring = input<boolean>(false);
}
