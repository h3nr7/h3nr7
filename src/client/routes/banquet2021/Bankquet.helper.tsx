import * as Moment from 'moment';

type IDaysCountdown = [number, number, number, number] | string;
export const dayCountdown = ():IDaysCountdown => {
    const today = Moment();
    const firstDay = Moment('2021-01-10');
    const firstWeekDay = firstDay.add(1, 'day');
    const lastDay = Moment('2021-02-15');
    const totDays = lastDay.diff(firstDay, 'days') + 1;
    const daysSofar = today.diff(firstDay, 'days');
    const totWeeks = lastDay.diff(firstWeekDay, 'weeks');
    const weeksSofar = today.diff(firstWeekDay, 'weeks') + 1;
    
    if(today.isAfter(lastDay)) return 'All done!';
    
    return [daysSofar, totDays, weeksSofar, totWeeks];
}