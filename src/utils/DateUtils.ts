export class DateUtils {
  static getTodaysDateTime() {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth(); //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds

    const dateTime = new Date(year, month, date, hours, min, sec);

    return dateTime;
  }

  static parseDate(date: any) {
    let dateString = '';
    dateString += date.toString();
    return dateString;
  }

  static sameDay(dateTime1: Date, dateTime2: Date) {
    if (
      dateTime1.getDate() === dateTime2.getDate() &&
      dateTime1.getMonth() === dateTime2.getMonth() &&
      dateTime1.getFullYear() === dateTime2.getFullYear()
    ) {
      return true;
    }
    return false;
  }

  static parseDateTimesIntoLabels(dateTimes: Date[]) {
    const parsedDateTimes: string[] = [];

    dateTimes.forEach((dateTime: any) => {
      const hours = dateTime.getHours();
      const minutes =
        dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();
      const parsedDateTime = hours + 'h' + minutes;
      parsedDateTimes.push(parsedDateTime);
    });

    return parsedDateTimes;
  }
}
