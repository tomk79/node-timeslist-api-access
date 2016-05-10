var assert = require('assert');
var path = require('path');
var fs = require('fs');
var TimeslistApi = require(__dirname+'/../node/main.js');
var conf = require('config');

describe('TIMESLIST から情報を取得する', function() {
	var timeslistApi = new TimeslistApi(conf.user_id, conf.user_pw);
	// console.log(conf);

	it('所属プロジェクト情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.project({
			// 'limit': 0
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();
		});
	});

	it('所属プロジェクトチーム情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.team({
			'project_no': 190
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();
		});
	});

	it('所属プロジェクトフェーズ情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.phase({
			'project_no': 190
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();
		});
	});

	it('所属プロジェクト種別リスト情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.facttype({
			'project_no': 190
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();
		});
	});

	it('所属プロジェクト種別リストステータス情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.factstatus({
			'project_no': 190
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));

			timeslistApi.factstatus({
				'project_no': 190,
				'param1': 4
			},function(res, json, status, headers){
				// console.log(json);
				assert.equal(status, 200);
				assert.equal(json.return_code, 0);
				assert.equal(typeof(headers), typeof({}));
				assert.equal(typeof(res), typeof([]));
				done();
			});

		});
	});

	it('公開範囲情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.factpublic({
			'project_no': 190
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();

		});
	});

	it('担当者情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.factuser({
			'project_no': 190
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();

		});
	});

	it('カテゴリ情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.category({
			'project_no': 190
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();

		});
	});

	it('重みづけコード情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.factweighting({
			'project_no': 190
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();

		});
	});

	it('ファクト情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.fact({
			'keyword': 'Wp'
		},function(res, json, status, headers){
			// console.log(json);
			assert.equal(status, 200);
			assert.equal(json.return_code, 0);
			assert.equal(typeof(headers), typeof({}));
			assert.equal(typeof(res), typeof([]));
			done();

		});
	});

	it('ファクト関連情報取得', function(done) {
		this.timeout(10*1000);

		timeslistApi.factrel({
			'project_no': 190
		},function(res, json, status, headers){
			// console.log(json);
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
			// 'fact_type_status_no' : 20
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

describe('TIMESLIST に情報を投稿する', function() {
	var timeslistApi = new TimeslistApi(conf.user_id, conf.user_pw);
	var newFactNum = null;

	// it('ファクト新規投稿', function(done) {
	// 	this.timeout(10*1000);
	//
	// 	timeslistApi.postFact({
	// 		'project_no' : 190 ,
	// 		'fact_title' : 'テスト FACT' ,
	// 		'fact_content' : 'テスト FACT content' ,
	// 		'fact_public' : 'C-180' ,
	// 		'fact_user_no' : 180 ,
	// 		'fact_deadline' : '2016-01-01 00:00:00' ,
	// 		'fact_type_no' : 2 ,
	// 		'phase_no' : '' ,
	// 		'fact_category_no' : 3 ,
	// 		'fact_weighting_code' : 'BB' ,
	// 		'fact_type_status_no' : 1
	// 	},function(res, json, status, headers){
	// 		console.log(json);
	// 		assert.equal(status, 200);
	// 		assert.equal(json.return_code, 0);
	// 		assert.equal(typeof(headers), typeof({}));
	// 		assert.equal(typeof(res), typeof([]));
	// 		newFactNum = json.list.fact_no;
	// 		done();
	// 	});
	// });

	// it('コメント新規投稿', function(done) {
	// 	this.timeout(10*1000);
	//
	// 	console.log(newFactNum);
	// 	timeslistApi.postComment({
	// 		'project_no': 190,
	// 		'fact_no': newFactNum ,
	// 		'fact_comment_content': 'コメントテスト' ,
	// 		'fact_comment_user_no': 180 ,
	// 		'fact_comment_deadline': '2016-01-01 00:00:00' ,
	// 		'fact_comment_type_status_no': 1
	// 	},function(res, json, status, headers){
	// 		console.log(json);
	// 		assert.equal(status, 200);
	// 		assert.equal(json.return_code, 0);
	// 		assert.equal(typeof(headers), typeof({}));
	// 		assert.equal(typeof(res), typeof([]));
	// 		done();
	// 	});
	// });

	// it('リクエスト投稿', function(done) {
	// 	this.timeout(10*1000);
	//
	// 	timeslistApi.postRequest({
	// 		'project_no': 190,
	// 		'fact_no': 190 ,
	// 		'request_no': ''
	// 	},function(res, json, status, headers){
	// 		// console.log(json);
	// 		assert.equal(status, 200);
	// 		assert.equal(json.return_code, 0);
	// 		assert.equal(typeof(headers), typeof({}));
	// 		assert.equal(typeof(res), typeof([]));
	// 		done();
	// 	});
	// });

});
