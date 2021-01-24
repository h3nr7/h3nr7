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
