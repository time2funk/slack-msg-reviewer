const _config = require('./config');
const _module = require('./module');

// const SlackMethods = require('./module/slack-methods');
// const App = require('./module/app');
const {App, SlackMethods} = _module;

const methods = new SlackMethods(_config.slack.token, _config.slack.user);

// Promise chain
methods.findUserId().then((userID) => {
	console.log("userID", userID);

	methods.findChannelsIds().then(channelList => {
		console.log("channelList", channelList);

		methods.findChannelsMsgsByUserId(channelList, userID).then(msgList => {
			console.log("msgList", msgList);

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
