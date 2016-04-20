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
	var apiOrigin = 'https://timeslist.com'

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
		this.httpRequest(apiOrigin+'/api/login/', {
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
			var rtn = 'ERROR: url is NOT set.';
			callback(rtn, rtn, 0, {});
			return;
		}

		return new (function(apiSettings){
			this.fnc = function(options, callback){
				var apiSettingsUrl = apiSettings.url;
				if( arguments.length == 2 ){
					options = arguments[0];
					callback = arguments[1];
				}else{
					callback = arguments[0];
				}

				var url = '';
				while( 1 ){
					var matched = apiSettingsUrl.match(new RegExp('^([\\s\\S]*?)\\[(.*?)\\]([\\s\\S]*)$'));
					if( !matched ){
						url += apiSettingsUrl;
						break;
					}
					url += matched[1];
					var tmpParamKey = matched[2];
					if(options[tmpParamKey] === undefined){options[tmpParamKey] = '';}
					url += options[tmpParamKey];
					delete(options[tmpParamKey]);
					apiSettingsUrl = matched[3];
				}
				url = apiOrigin+require('path').resolve(url);
				apiSettingsUrl = url;
				if( !apiSettings.method ){
					apiSettings.method = 'GET';
				}

				options = options || {};
				callback = callback || function(){};
				// console.log(url);
				// console.log(options);
				_this.login(function(){
					_this.httpRequest(
						url,
						{
							'params': options ,
							'method': apiSettings.method
						},
						function(bin, status, responseHeaders){
							try {
								bin = JSON.parse(bin);
							} catch (e) {
								// console.log(bin);
							}
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
		'url': '/api/project/'
	});

	/**
	 * 所属プロジェクトチーム情報取得
	 */
	module.exports.prototype.team = mkApi({
		'url': '/api/team/[project_no]/'
	});

	/**
	* 所属プロジェクトフェーズ情報取得
	*/
	module.exports.prototype.phase = mkApi({
		'url': '/api/phase/[project_no]/'
	});

	/**
	* 所属プロジェクト種別リスト情報取得
	*/
	module.exports.prototype.facttype = mkApi({
		'url': '/api/facttype/[project_no]/'
	});

	/**
	* 所属プロジェクト種別リストステータス情報取得
	*/
	module.exports.prototype.factstatus = mkApi({
		'url': '/api/factstatus/[project_no]/'
	});

	/**
	* 公開範囲情報取得
	*/
	module.exports.prototype.factpublic = mkApi({
		'url': '/api/factpublic/[project_no]/'
	});

	/**
	* 担当者情報取得
	*/
	module.exports.prototype.factuser = mkApi({
		'url': '/api/factuser/[project_no]/'
	});

	/**
	* カテゴリ情報取得
	*/
	module.exports.prototype.category = mkApi({
		'url': '/api/category/[project_no]/'
	});

	/**
	* 重みづけコード情報取得
	*/
	module.exports.prototype.factweighting = mkApi({
		'url': '/api/factweighting/[project_no]/'
	});

	/**
	* ファクト情報取得
	*/
	module.exports.prototype.fact = mkApi({
		'url': '/api/fact/[keyword]/'
	});

	/**
	* ファクト関連情報取得
	*/
	module.exports.prototype.factrel = mkApi({
		'url': '/api/factrel/[project_no]/'
	});

	/**
	 * 個人ToDo情報取得
	 */
	module.exports.prototype.factpersonal = mkApi({
		'url': '/api/factpersonal/[fact_type_status_no]/'
	});

	/**
	* ファクト新規投稿
	*/
	module.exports.prototype.postFact = mkApi({
		'url': '/api/fact/[project_no]/',
		'method': 'POST'
	});

	/**
	* コメント新規投稿
	*/
	module.exports.prototype.postComment = mkApi({
		'url': '/api/fact/[project_no]/[fact_no]/',
		'method': 'POST'
	});

	/**
	* リクエスト投稿
	*/
	module.exports.prototype.postRequest = mkApi({
		'url': '/api/fact/[project_no]/[fact_no]/',
		'method': 'POST'
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
		if( options.method.toUpperCase() == 'POST' ){
			options.headers['Content-Length'] = options.body.length;
		}
		delete(options.params);
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
