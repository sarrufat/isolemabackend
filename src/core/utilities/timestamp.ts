export class TimeStamp {

    public static convertDateToMillis(dateValue: string, timeValue: string): number {
        var parts = dateValue.split("/");
        var partsTime = timeValue.split(":");

        var dayValue = parts[0];
        var monthValue = parts[1];
        var yearValue = parts[2];

        var hourValue = partsTime[0];
        var minuteValue = partsTime[1];
        var secondsValue = partsTime[2];

        var dt = new Date(parseInt(yearValue, 10),
            parseInt(monthValue, 10) - 1,
            parseInt(yearValue, 10),
            parseInt(hourValue),
            parseInt(minuteValue),
            parseInt(secondsValue));

        return Math.floor(dt.getTime() / 1000);


    }

    public static convertNowToMillis(): number {
        return Math.floor(new Date().getTime() / 1000)
    }

    public static isValidDate(dateValue: string): boolean {

        try {
            var year = parseInt(dateValue.substring(0, 4)),
                month = parseInt(dateValue.substr(4, 2)),
                day = parseInt(dateValue.substr(6, 2)),
                hours = parseInt(dateValue.substr(8, 2)),
                minutes = parseInt(dateValue.substr(10, 2)),
                seconds = parseInt(dateValue.substr(12, 2));

            var completeDate = new Date(year, month - 1, day, hours, minutes, seconds, 0);

            return (completeDate.getFullYear() == year && completeDate.getMonth() == month - 1 && completeDate.getDate() == day) &&
                completeDate.getHours() == hours && completeDate.getMinutes() == minutes && completeDate.getSeconds() == seconds ? true : false;
        }

        catch (e) {
            return false;
        }

    }

}