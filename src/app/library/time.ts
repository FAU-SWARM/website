const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = second * 3.154e+7;

function date_to_filename(date: Date = null): string {
    if (!date) {
        date = new Date();
    }
    let new_value: string = null;

    let years: any = date.getFullYear();
    let months: any = date.getMonth() + 1;
    if (months === 0 || (months > 0 && months % 10 > 0))
      months = `0${months}`;
    let days: any = date.getDate();
    if (days === 0 || (days > 0 && days % 10 > 0))
      days = `0${days}`;

    let hours: any = date.getHours();
    if (hours < 10)
      hours = `0${hours}`;
    let minutes: any = date.getMinutes();
    if (minutes < 10)
      minutes = `0${minutes}`;
    let seconds: any = date.getSeconds();
    if (seconds < 10)
      seconds = `0${seconds}`;
    new_value = `${years}${months}${days}-${hours}${minutes}${seconds}`;
    return new_value
}

export {
    date_to_filename,
};
