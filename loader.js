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
		console.log(_o.response.items);
	});

}





module.exports = loader;