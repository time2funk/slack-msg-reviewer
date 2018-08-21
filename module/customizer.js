// get date from msg ts
function getDate(unix_timestamp){
	const date = new Date(unix_timestamp*1000);
	return `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()}`;
}
// get time from msg ts
function getTime(unix_timestamp){
	const date = new Date(unix_timestamp*1000);
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

module.exports = function(data, userId){
	return data.filter(item => {
		if(item && item.subtype && item.subtype === "channel_join")
			return false;
		else return true;
	}).map(item => {
		return {
			text: item.text.replace(`<@${userId}>`, ''),
			time: getTime(item.ts),
			date: getDate(item.ts)
		}
	});
};