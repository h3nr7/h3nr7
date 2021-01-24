import { useEffect, useState } from "react";


// calculate days left
export const calDaysLeft = (startDate:Date, endDate:Date):number => {
    const [out, setOut] = useState<number>(0);
    useEffect(() => {
        const o = Math.floor(Math.abs((Number(endDate.getTime()) - Number(startDate.getTime())) / (1000 * 60 * 60 * 24)))
        setOut(o);
    }, [startDate, endDate]);

    return out;
}

// calculate hour minutes and seconds with seconds
export const calHrMinSecFromSecs = (elapsed_time_seconds:number):[number, number, number] => {
    const [out, setOut] = useState<[number, number, number]>([0, 0, 0]);
    useEffect(() => {
        let secs = elapsed_time_seconds;
        let minutes = Math.floor(secs / 60);
        secs = secs%60;
        let hours = Math.floor(minutes/60)
        minutes = minutes%60;

        setOut([hours, minutes, secs]);
    }, [elapsed_time_seconds]);

    return out;
}

export const calKmFromMeters = (d_meters:number): number => {
    const [out, setOut] = useState<number>(0);
    useEffect(() => {
        const o =  d_meters ? Math.round(d_meters/100)/10 : 0;
        setOut(o);
    }, [d_meters]);

    return out;
}