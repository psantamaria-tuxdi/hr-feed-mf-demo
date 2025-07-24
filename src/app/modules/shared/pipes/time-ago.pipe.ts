import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    const dateValue = value instanceof Date ? value : new Date(value);
    if (isNaN(dateValue.getTime())) return '';

    const now = new Date();
    const seconds = Math.floor((now.getTime() - dateValue.getTime()) / 1000);

    const intervals = {
      año: 31536000,
      mes: 2592000,
      semana: 604800,
      día: 86400,
      hora: 3600,
      minuto: 60,
      segundo: 1,
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const count = Math.floor(seconds / secondsInUnit);
      if (count > 0) {
        return count === 1 ? `Hace ${count} ${unit}` : `Hace ${count} ${unit}s`;
      }
    }
    return 'Justo ahora';
  }
}
