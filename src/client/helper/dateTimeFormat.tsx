

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
