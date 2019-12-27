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
}
