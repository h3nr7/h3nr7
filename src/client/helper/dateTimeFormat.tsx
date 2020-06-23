

// formate time string
export const displayDate = (timeStr:number):string => (new Date(timeStr)).toLocaleDateString("en-GB", {  
    // weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});

// calculate days left
export const calDaysLeft = (startDate:Date, endDate:Date):number => {
    return Math.floor(Math.abs((Number(endDate.getTime()) - Number(startDate.getTime())) / (60 * 60 * 24)))
}
