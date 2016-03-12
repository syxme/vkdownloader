var	http	= require('http'), 
	fs 		= require('fs'),
	https	 = require('https');
var VK = require('vksdk');

loader = function(){

	vk = new VK({
	   'appId'     : '5016020',
	   'appSecret' : 'S3e22qAKkEWi36nENw9T',
	   'language'  : 'ru',
	   'mode'      : 'oauth'
	});
	vk.setToken('9e5be728c13d570fdcef85ec5f9193eb7ea1964c97bfe62ab330e496bce41629628ec788f64b30a172445');
	vk.setSecureRequests(true);
	vk.request('audio.get', {owner_id:65539100}, function(_o) {
		items = _o.response.items;
		item = items[items.length-1];
		console.time('Download');
		download(item.url,item.artist+' - '+item.title+'.mp3',function(){
			console.timeEnd('Download');
			console.log('end');
		});
	});

}

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

// download('http://cs4959.vk.me/u65539100/audios/9a445f63637d.mp3?extra=CHNtp7-3PsDvV763nm70nklIbQ9YCmhoVW7Efvv1vDX1w75d92P6y1WkQXwv6IQAuoGGeeFyv5ccD9Z4D-S9VDaTLhsllwgXARrzVKWdzNtY2vN41nc759uqNQXSWepHXoNSp8qJX-jj','asfsafsa.mp3',function(){

// });


module.exports = loader;