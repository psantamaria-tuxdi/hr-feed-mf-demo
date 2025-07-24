import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { User } from 'app/core/user/user.types';
import { AvatarModule } from 'ngx-avatars';
import { Author } from '../../types/author.types';

@Component({
  selector: 'hr-avatar',
  templateUrl: './avatar.component.html',
  standalone: true,
  imports: [NgClass, AvatarModule],
})
export class AvatarComponent {
  data = input.required<User | Author>();
  size = input.required<number>();
  ring = input<boolean>(false);
}
