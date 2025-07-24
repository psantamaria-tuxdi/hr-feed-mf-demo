import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'likesCount',
  standalone: true,
})
export class LikesCountPipe implements PipeTransform {
  transform(count: number, isLikedByCurrentUser: boolean): string {
    if (isLikedByCurrentUser) {
      if (count === 1) {
        return 'A ti te gusta esto';
      }
      const otherLikers = count - 1;

      if (otherLikers === 1) {
        return 'A ti y a 1 persona más les gusta esto';
      }

      return `A ti y a ${otherLikers} personas más les gusta esto`;
    }

    if (count === 1) {
      return 'A 1 persona le gusta esto';
    }

    return `A ${count} personas les gusta esto`;
  }
}
