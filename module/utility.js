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

module.exports = {

	filterMessages(messages, userId) {
        const pattern = `<@${userId}>`;

        return messages
        	.filter(item => item.text.includes(pattern))
        	.filter(item => {
				if(item.type !== "message")
					return false;
				else if(item && item.subtype && item.subtype === "channel_join")
					return false;
				else return true;
			})
        	.map(item => ({
				ts: item.ts,
				user: item.user,
				text: item.text,
				source: item.source
			}))
			.sort((a,b) => a.ts < b.ts);
	},

	replaceIds(messages, users){
		return messages
		.map(item => {
			for(let i=0; i < users.length; i++){
				if(users[i].id === item.user){
					if(users[i].profile && users[i].profile.display_name)
						item.user = users[i].profile.display_name;
					else
						item.user = users[i].name;
					break;
				}
			}
			item.text = item.text.replace(/<@\w*>/g,"");
			return item;
		});
	},

	customizer(data){
		return data.map(item => {
			return {
				text: item.text,
				from: item.user,
				time: getTime(item.ts),
				date: getDate(item.ts),
				source: item.source
			}
		});
	}

}

				// text: userName 
				// 	? item.text.replace(`<@${userId}>`, '@userName')
				// 	: item.text.replace(`<@${userId}>`, ''),


        // for (let i=0; i < data.messages.length; i++) {
        //     if(data.messages[i].text.includes(pattern))
        //         msgs.push(data.messages[i]);
        // }
                // const pattern = `<@${user_id}>`;
                // const msgs = [];

                // for (let i=0; i < data.messages.length; i++) {
                //     if(data.messages[i].text.includes(pattern))
                //         msgs.push(data.messages[i]);
                // }

                // resolve(data.messages);



// var _date = new Date(unix_timestamp*1000);
// var date = `${date.getFullYear()} . ${_date.getMonth()+1} . ${_date.getDate()}`;
// var time = `${_date.getHours()} : ${_date.getMinutes()} : ${_date.getSeconds()}`;
