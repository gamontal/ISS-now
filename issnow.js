var request = require('request');
var colors = require('colors');

request('http://api.open-notify.org/iss-now.json', function (error, resp, body) {
  if (!error && resp.statusCode == 200) {
    var data = JSON.parse(body);
    var time = new Date(timeConverter(data.timestamp));
    var latitude = data.iss_position.latitude.toFixed(3);
    var longitude = data.iss_position.longitude.toFixed(3);

    console.log('\nThe ISS is currently over ' + colors.cyan(latitude) + ' deg N, ' + colors.cyan(longitude) + ' deg E\n');
    console.log('[' + time + ']\n');
  } else {
    console.log(error);
  }
});

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}


