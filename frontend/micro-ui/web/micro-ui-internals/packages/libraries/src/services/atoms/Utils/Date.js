import { format, toDate } from "date-fns";
import fetch from 'isomorphic-unfetch';

export const ConvertTimestampToDate = (timestamp, dateFormat = "d-MMM-yyyy") => {
  return timestamp ? format(toDate(timestamp), dateFormat) : null;
};

export const ConvertEpochToDate = (dateEpoch) => {
  if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
    return "NA";
  }
  const dateFromApi = new Date(dateEpoch);
  let month = dateFromApi.getMonth() + 1;
  let day = dateFromApi.getDate();
  let year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return `${day}/${month}/${year}`;
};

export const ConvertEpochToTimeInHours = (dateEpoch) => {
  if (dateEpoch == null || dateEpoch == undefined || dateEpoch == "") {
    return "NA";
  }
  const dateFromApi = new Date(dateEpoch);
  let hour = dateFromApi.getHours();
  let min = dateFromApi.getMinutes();
  let period = hour > 12 ? "PM" : "AM";
  hour = hour > 12 ? hour - 12 : hour;
  hour = (hour > 9 ? "" : "0") + hour;
  min = (min > 9 ? "" : "0") + min;
  return `${hour}:${min} ${period}`;
};

export const getWorldTime = async () => {
  const timestamp = await worldTime();
  return timestamp;
};


const worldTime = async (timezone = "Asia/Kolkata") => {
  const res = await fetch(`https://worldtimeapi.org/api/timezone/${timezone}`);
  const json = await res.json();
  const status = res.status;

  if (status >= 400)
    throw Error(res.statusText);

  const utcDatetime = json.utc_datetime;
  const datetimeMicrosecond = +utcDatetime.match(/\.\d{3}(\d*?)[+Z]/)[1];
  const utcMicroseconds = new Date(utcDatetime).getTime() * 1000 + datetimeMicrosecond;
  const microseconds = utcMicroseconds + json.raw_offset * 1000000;

  return {
    response: json,
    milliseconds: microseconds / 1000,
    utcMilliseconds: utcMicroseconds / 1000,
    microseconds: microseconds,
    utcMicroseconds: utcMicroseconds,
  };
}
