const assert = require('chai').assert;

const config = require('../config');
const slackApi = require('../module/slack-api');
const slack = new slackApi(config.slack.token);

describe('[Slack API]', function(){

	describe('connection', function(){
		let result;

		before(async function() {
			result = await slack.getSelfData();
		});
		it('must return ok:true', function(){
			assert.isOk(result.ok);
		})
	});

	describe('fetch users testing', function(){
		let result;

		before(async function() {
			result = await slack.users();
		});
		it('must return ok:true', function(){
			assert.isOk(result.ok);
		});
	});

	describe('fetch channels testing', function(){
		let result;

		before(async function() {
			result = await slack.channels();
		});
		it('must return ok:true', function(){
			assert.isOk(result.ok);
		});
		it('should be more then 0 channels', function(){
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
		it('history response must return ok:true', function(){
			assert.isOk(history.ok);
		});
		it('should be more then 0 msgs in channel', function(){
			assert.isAtLeast(history.messages.length, 1);
		});
	});

});

