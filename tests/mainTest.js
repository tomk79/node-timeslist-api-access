var assert = require('assert');
var path = require('path');
var fs = require('fs');
var TimeslistApi = require(__dirname+'/../node/main.js');

describe('TIMESLIST に接続する', function() {

	it('TIMESLIST に接続する', function(done) {
		this.timeout(10000);

		var timeslistApi = new TimeslistApi();

		assert.equal(1, 1);
		done();
	});

});
