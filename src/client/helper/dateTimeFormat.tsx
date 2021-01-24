

// formate time string
export const displayDate = (timeStr:number):string => (new Date(timeStr)).toLocaleDateString("en-GB", {  
    // weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});

export const displayMonthYearDate = (timeStr:number | string):string => {
    const monthArr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    const dD = new Date(timeStr)
    return `${monthArr[dD.getMonth()]} ${dD.getFullYear()}`
}

// calculate days left
export const calDaysLeft = (startDate:Date, endDate:Date):number => {
    return Math.floor(Math.abs((Number(endDate.getTime()) - Number(startDate.getTime())) / (1000 * 60 * 60 * 24)))
}

// calculate hour minutes and seconds with seconds
export const calHrMinSecFromSecs = (elapsed_time_seconds:number):[number, number, number] => {
    let secs = elapsed_time_seconds;
    let minutes = Math.floor(secs / 60);
    secs = secs%60;
    let hours = Math.floor(minutes/60)
    minutes = minutes%60;

    return [hours, minutes, secs];
}

export const calKmFromMeters = (d_meters:number): number => {
    return Math.round(d_meters/100)/10;
}
