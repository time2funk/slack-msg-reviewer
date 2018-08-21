const electron = require('electron');
// const { ipcMain } = electron

const _config = require('./config');
const _module = require('./module');
const { App, SlackMethods, customizer } = _module;
const { app, sendDataToApp } = App;


const methods = new SlackMethods(_config.slack.token, _config.slack.user);

// Promise chain
methods.findUserId().then((userID) => {
	console.log("userID", userID);

	methods.findChannelsIds().then(channelList => {
		console.log("channelList", channelList);

		methods.findChannelsMsgsByUserId(channelList, userID).then(msgList => {
			console.log("msgList", msgList);
			// customize data befor send
			const data = customizer(msgList, userID);
			// send msg data to app
			sendDataToApp(data);

		}).catch(e => {
			console.log(e);
		});
	}).catch(e => {
		console.log(e);
	});
}).catch(e => {
	console.log(e);
});


// var _date = new Date(unix_timestamp*1000);
// var date = `${date.getFullYear()} . ${_date.getMonth()+1} . ${_date.getDate()}`;
// var time = `${_date.getHours()} : ${_date.getMinutes()} : ${_date.getSeconds()}`;
