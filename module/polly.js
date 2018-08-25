const AWS = require('aws-sdk');
const fs = require('fs');

module.exports = class {
	constructor(config){
		AWS.config = config.auth;
		this.polly = new AWS.Polly();
		this.voice = config.voice.id;
	}

	getVoiceList(lang){
		return new Promise((resolve, reject) => {
			if (lang) {
				this.polly.describeVoices({"LanguageCode": lang}, function (err, data) {
					if (err) {
						reject(err);
					} else {
						resolve(data);
					}
				});
			} else reject("no 'lang' param in describeVoices() AWS Polly");
		});
	}

	getVoice(text){
		return new Promise((resolve, reject) => {
			const params = {
				OutputFormat: 'mp3',
				Text: text,
				VoiceId: this.voice,
                TextType: 'text'
			};
			this.polly.synthesizeSpeech(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);

					// fs.writeFile('testing.mp3', data.AudioStream, function (err) {
					// 	if (err) { 
					// 		console.log('An error occurred while writing the file.');
					// 		console.log(err);
					// 	}
					// 	console.log('Finished writing the file to the filesystem')
					// });
				}
			});
		});
	}

}

