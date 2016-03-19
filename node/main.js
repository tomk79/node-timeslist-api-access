/**
 * main.js
 */
(function(module){
	var Promise = require('es6-promise').Promise;
	var utils79 = require('utils79');
	var https = require('https');
	var urlParse = require('url-parse');
	var querystring = require('querystring');
	var _this;

	/**
	 * Constructor
	 */
	module.exports = function(user_id, user_pw){
		_this = this;
		_this.user_id = utils79.base64_encode(user_id);
		_this.user_pw = utils79.base64_encode(user_pw);
		_this.accesskey = null;
	}

	/**
	 * ログインする
	 */
	module.exports.prototype.login = function(callback){
		callback = callback || function(){};
		var _this = this;
		if(_this.accesskey){
			callback();
			return;
		}
		this.httpRequest('https://timeslist.com/api/login/', {
			headers: {
				'Timeslist-User': this.user_id,
				'Timeslist-Password': this.user_pw
			}
		}, function(bin, status, headers){
			bin = JSON.parse(bin);
			_this.accesskey = bin.accesskey;
			// console.log(bin);
			callback();
		});
		return this;
	}

	/**
	 * APIの汎用的雛形
	 */
	function mkApi(apiSettings){
		apiSettings = apiSettings || {};
		if(!apiSettings.url){

		}
		return new (function(apiSettings){
			this.fnc = function(options, callback){
				if( arguments.length == 2 ){
					options = arguments[0];
					callback = arguments[1];
				}else{
					callback = arguments[0];
				}
				options = options || {};
				callback = callback || function(){};
				_this.login(function(){
					_this.httpRequest(
						apiSettings.url,
						{
							'params': options
						},
						function(bin, status, responseHeaders){
							bin = JSON.parse(bin);
							callback(bin.list, bin, status, responseHeaders);
						}
					);
				});
			}
		})(apiSettings).fnc;
	}


	/**
	* 所属プロジェクト情報取得
	*/
	module.exports.prototype.project = mkApi({
		'url': 'https://timeslist.com/api/project/'
	});

	/**
	 * 個人ToDo情報取得
	 */
	module.exports.prototype.factpersonal = mkApi({
		'url': 'https://timeslist.com/api/factpersonal/'
	});

	/**
	 * HTTPSリクエストを送信する
	 */
	module.exports.prototype.httpRequest = function(url, options, callback){
		callback = callback || function(){};
		var urlParsed = new urlParse(url);
		// console.log(urlParsed);

		options = options || {};
		options.hostname = options.hostname || urlParsed.host;
		options.port = options.port || 443; // 443 is default for https
		options.path = options.path || urlParsed.pathname;
		options.method = options.method || 'GET';
		options.headers = options.headers || {};
		if( this.accesskey ){
			options.headers['Timeslist-Accesskey'] = this.accesskey;
		}
		options.params = options.params || {};
		options.body = options.body || querystring.stringify(options.params);

		// console.log(options.body);
		if( options.method.toUpperCase() == 'GET' ){
			if(options.body){
				options.path += '?'+options.body;
				options.body = '';
			}
		}
		// console.log(options);

		var status = 0;
		var responseHeaders = {};
		var data = '';
		var req = https.request(options, function(res){
			status = res.statusCode;
			responseHeaders = res.headers;
			// console.log('STATUS: '+res.statusCode);
			// console.log('HEADERS: '+JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function(chunk){
				data += chunk;
				// console.log('BODY: '+ chunk);
			});
			res.on('end', function(){
				// console.log('No more data in response.');
				callback(data, status, responseHeaders);
			})
		});

		req.on('error', function(e){
			callback('problem with request: '+ e.message, 0, {});
		});

		// write data to request body
		req.write(options.body);
		req.end();

		return;
	}

})(module);
