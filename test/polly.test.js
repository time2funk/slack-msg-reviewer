const assert = require('chai').assert;

const config = require('../config');
const Polly = require('../module/polly');
const polly = new Polly(config.polly);

describe('[AWS Polly]', function(){

	describe('test sdk-conn by calling list of voices', function(){
		it('must return response', async function(){
			const result = await polly.getVoiceList("en-US");
			assert.isTrue(result && result.Voices && result.Voices.length > 0);
		});
	});

	describe('get voice buffor', function(){
		let result;

		before(async function() {
			result = await polly.getVoice("testing...");
		});
		it('response must be Ok', function(){
			assert.isOk(result);
		});
		it('response ContentType must be audio/mpeg', function(){
			assert.equal(result.ContentType, 'audio/mpeg');
		});
		it('response AudioStream must be a Buffer', function(){
			assert.instanceOf(result.AudioStream, Buffer);
		});
	});

})