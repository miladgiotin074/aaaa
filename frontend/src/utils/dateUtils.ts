import moment from 'moment-jalaali';
import 'moment-timezone';

export function formatJalaliDate(date: Date | string): string {
    return moment(date).format('jYYYY/jMM/jDD HH:mm');
} 