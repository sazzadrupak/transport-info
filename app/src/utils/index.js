export const unixToDateTime = (unix_timestamp) => {
  var date = new Date(unix_timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes() >= 0 && date.getMinutes() < 10? "0" + date.getMinutes(): date.getMinutes();
  return `${hours}:${minutes}`;
}

export const getDateTime = () => {
  var now     = new Date(); 
  var year    = now.getFullYear();
  var month   = now.getMonth()+1; 
  var day     = now.getDate();
  var hour    = now.getHours();
  var minute  = now.getMinutes();
  var second  = now.getSeconds(); 
  if(month.toString().length === 1) {
       month = '0'+month;
  }
  if(day.toString().length === 1) {
       day = '0'+day;
  }   
  if(hour.toString().length === 1) {
       hour = '0'+hour;
  }
  if(minute.toString().length === 1) {
       minute = '0'+minute;
  }
  if(second.toString().length === 1) {
       second = '0'+second;
  }   
  const date = year+'-'+month+'-'+day;
  const time = hour+':'+minute+':'+second;   
   return {date, time};
}

export const routesIcons = {
  'WALK': 'male',
  'BUS': 'bus',
  'RAIL': 'train',
  'TRAM': 'train',
  'FERRY': 'ship',
  'SUBWAY': 'subway'
}

export const distanceInKM = (distance) => {
  const kmValue = Math.round(distance/1000);
  return `Distance: ${ kmValue > 0 ? kmValue : 1} KM`
}