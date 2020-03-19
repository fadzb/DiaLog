export class DateUtils {
  static DAYS_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  static DAYS = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  static MONTHS_LONG = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  static MONTHS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Not sure why im doing this? new Date() should work?
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

  // return a date object x days ago
  static getDayXdaysAgo(x: number) {
    const dateNow = new Date();
    const oneDayInMs = 1000 * 60 * 60 * 24;

    return new Date(dateNow - oneDayInMs * x);
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

  // Turns Date object into 08:30
  static parseDateTimeIntoLabel(dateTime: Date) {
    let parsedDateTime = '';

    const hours = dateTime.getHours();
    const minutes =
      dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();

    parsedDateTime = hours + ':' + minutes;

    return parsedDateTime;
  }

  // Turns Date object into Thu 24/07
  static parseDateTimeIntoDateLabel(dateTime: Date) {
    let parsedDateTime = '';

    const dayOfWeek = dateTime.getDay();
    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const hours = dateTime.getHours();
    const minutes =
      dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes();

    parsedDateTime =
      DateUtils.DAYS[dayOfWeek] +
      ' ' +
      day +
      ' ' +
      DateUtils.MONTHS[month] +
      ' @ ' +
      hours +
      ':' +
      minutes;

    return parsedDateTime;
  }
}
