var	http	= require('http'),
	https   = require('https');

loader = function(){

  // var post_data = querystring.stringify({
  //     'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
  //     'output_format': 'json',
  //     'output_info': 'compiled_code',
  //       'warning_level' : 'QUIET',
  //       'js_code' : codestring
  // });
  var post_options = {
      host: 'closure-compiler.appspot.com',
      port: '80',
      path: '/compile',
      method: 'POST'
      // headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //     'Content-Length': Buffer.byteLength(post_data)
      // }
  };
  var options = {
        host: 'm.vk.com',
        port: 80
        //path: '/api.php?' + requestString
    };



	https.get(options, function(res) {
        var apiResponse = 'as';
        res.setEncoding('utf8');
        console.log('statusCode: ', res.statusCode);
  		console.log('headers: ', res.headers);

        res.on('data', function(chunk) {
            apiResponse += chunk;
        });

        res.on('end', function() {
        	console.log(apiResponse);    
        });
    }).on('error', function (e) {
       console.log(e);
    });

}





module.exports = loader;