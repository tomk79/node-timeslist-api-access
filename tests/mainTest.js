var assert = require('assert');
var path = require('path');
var fs = require('fs');
var TimeslistApi = require(__dirname+'/../node/main.js');
var conf = require('config');

describe('TIMESLIST に接続する', function() {
	var timeslistApi = new TimeslistApi(conf.user_id, conf.user_pw);

	it('所属プロジェクト情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.project({
			// 'limit': 0
		},function(res, json, status, headers){
			// console.log(res);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();
		});
	});

	it('個人ToDo情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.factpersonal({
			// 'fact_type_status_no' : 1
		}, function(res, json, status, headers){
			// console.log(res);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();
		});
	});

});
