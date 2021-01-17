import * as Moment from 'moment';

type IDaysCountdown = [number, number] | string;
export const dayCountdown = ():IDaysCountdown => {
    const today = Moment();
    const firstDay = Moment('2021-01-10');
    const lastDay = Moment('2021-02-15');
    const totDays = lastDay.diff(firstDay, 'days');
    const daysSofar = today.diff(firstDay, 'days');
    
    if(today.isAfter(lastDay)) return 'All done!';
    
    return [daysSofar, totDays];
}