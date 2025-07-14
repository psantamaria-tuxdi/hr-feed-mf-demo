import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'likesCount',
})
export class LikesCountPipe implements PipeTransform {
    transform(count: number, isLikedByCurrentUser: boolean): string {
        if (isLikedByCurrentUser) {
            if (count === 1) {
                return 'A ti te gusta esto';
            }
            return `A ti y a ${count - 1} personas más les gusta esto`;
        }

        return `A ${count} personas les gusta esto`;
    }
}
