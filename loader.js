var	http	= require('http'), 
	fs 		= require('fs'),
	https	= require('https'),
 	VK 		= require('vksdk'),
	YandexDisk = require('yandex-disk').YandexDisk;

const root = __dirname+"/";

var a = {  "Ё": "YO",  "Й": "I",  "Ц": "TS",  "У": "U",  "К": "K",  "Е": "E",  "Н": "N",  "Г": "G",  "Ш": "SH",  "Щ": "SCH",  "З": "Z",  "Х": "H",  "Ъ": "",  "ё": "yo",  "й": "i",  "ц": "ts",  "у": "u",  "к": "k",  "е": "e",  "н": "n",  "г": "g",  "ш": "sh",  "щ": "sch",  "з": "z",  "х": "h",  "ъ": "",  "Ф": "F",  "Ы": "I",  "В": "V",  "А": "a",  "П": "P",  "Р": "R",  "О": "O",  "Л": "L",  "Д": "D",  "Ж": "ZH",  "Э": "E",  "ф": "f",  "ы": "i",  "в": "v",  "а": "a",  "п": "p",  "р": "r",  "о": "o",  "л": "l",  "д": "d",  "ж": "zh",  "э": "e",  "Я": "Ya",  "Ч": "CH",  "С": "S",  "М": "M",  "И": "I",  "Т": "T",  "Ь": "",  "Б": "B",  "Ю": "YU",  "я": "ya",  "ч": "ch",  "с": "s",  "м": "m",  "и": "i",  "т": "t",  "ь": "",  "б": "b",  "ю": "yu",  " ": "_"};

var transliterate = function(word) {
  return word.split('').map((function(_this) {
    return function(char) {
      return a[char] || char;
    };
  })(this)).join("");
};

loader = function(owner_id){
	console.log('start');
	vk = new VK({
	   'appId'     : '5016020',
	   'appSecret' : 'S3e22qAKkEWi36nENw9T',
	   'language'  : 'ru',
	   'mode'      : 'oauth'
	});

	var disk = new YandexDisk('b23d68acf1ec422390b0fab22c142aee');	
	vk.setToken('9e5be728c13d570fdcef85ec5f9193eb7ea1964c97bfe62ab330e496bce41629628ec788f64b30a172445');
	vk.setSecureRequests(true);

	function processW(idx,items,acc){
		console.time('PROCESSS TIME');
		var item = items[idx];
		var name = item.artist+' - '+item.title;
		var urlme = root+acc+'/'+item.id+'.mp3';

		if (name.length>50){
			name = name.substring(0,50)+'.mp3';
		}else{
			name+='.mp3';
		}

		console.time('vk:up');
		download(item.url,urlme,function(){
			console.timeEnd('vk:up');

			console.time('ya:up');
			disk.uploadFile(urlme, acc+'/'+name, function(err){

				console.timeEnd('ya:up');
				console.timeEnd('PROCESSS TIME');
				idx++;
				fs.unlinkSync(urlme);
				if (idx<items.length){
					console.log(name,'uploaded');

					console.log('Next File upload');
					processW(idx,items,acc);

				}else{
					disk.publish(acc, function(err,dir){
						console.log(dir);
					});	
				}

				
			});
		});
	}
	
	vk.request('audio.get', {owner_id:owner_id}, function(_o) {
		items = _o.response.items;
		if (items.length>0){
			console.log('StartPP');
			fs.mkdir(owner_id,function(err){
				disk.mkdir(owner_id, function(err,e){
					processW(0,items,owner_id);
				});
			});
			
		}
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


// ID: 74c4593b92a3458296dd4e952a89afc0
// Пароль: 64207b82d10447329693dcc080715904
// Callback URL: https://oauth.yandex.ru/verification_code

module.exports = loader;