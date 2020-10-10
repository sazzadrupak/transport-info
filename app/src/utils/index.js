import { faWalking, faSubway, faBus, faShip, faTrain } from '@fortawesome/free-solid-svg-icons';
export const unixToDateTime = (unix_timestamp) => {
  var date = new Date(unix_timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes() >= 0 && date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return `${hours}:${minutes}`;
}

export const getDateTime = () => {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  if (month.toString().length === 1) {
    month = '0' + month;
  }
  if (day.toString().length === 1) {
    day = '0' + day;
  }
  if (hour.toString().length === 1) {
    hour = '0' + hour;
  }
  if (minute.toString().length === 1) {
    minute = '0' + minute;
  }
  if (second.toString().length === 1) {
    second = '0' + second;
  }
  const date = year + '-' + month + '-' + day;
  const time = hour + ':' + minute + ':' + second;
  return { date, time };
}

export const routesIcons = {
  'WALK': faWalking,
  'BUS': faBus,
  'RAIL': faTrain,
  'TRAM': faTrain,
  'FERRY': faShip,
  'SUBWAY': faSubway
}

export const distanceInKM = (distance) => {
  const kmValue = (distance < 1000) ? `${Math.round(distance)} meters` : `${Math.round(distance / 1000)} km`;
  return kmValue;
}