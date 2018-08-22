const assert = require('chai').assert;
//expect, assert, should()

const config = require('../config');
const slackApi = require('../module/slack-api');
const slack = new slackApi(config.slack.token);

describe('[Slack API Testing]', function(){

	describe('connection', function(){
		let result;

		before(async function() {
			result = await slack.getSelfData();
		});
		it('must return ok:true', async function(){
			assert.isOk(result.ok);
		})
	});

	describe('fetch users testing', function(){
		let result;

		before(async function() {
			result = await slack.users();
		});
		it('must return ok:true', async function(){
			assert.isOk(result.ok);
		});
	});

	describe('fetch channels testing', function(){
		let result;

		before(async function() {
			result = await slack.channels();
		});
		it('must return ok:true', async function(){
			assert.isOk(result.ok);
		});
		it('should be more then 0 channels', async function(){
			assert.isAtLeast(result.channels.length, 1);
		});
	});

	describe('fetch channels history testing', async function(){
		let channels;
		let history;

		before(async function() {
			channels = await slack.channels();
			history = await slack.channelHistory(channels.channels[0].id);
		});
		it('history response must return ok:true', async function(){
			assert.isOk(history.ok);
		});
		it('should be more then 0 msgs in channel', async function(){
			assert.isAtLeast(history.messages.length, 1);
		});
	});

});


// before(function() {
//   // runs before all tests in this block
// });

// after(function() {
//   // runs after all tests in this block
// });

// beforeEach(function() {
//   // runs before each test in this block
// });

// afterEach(function() {
//   // runs after each test in this block
// });

