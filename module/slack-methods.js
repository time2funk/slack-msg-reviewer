const SlackAPI = require('./slack-api');

module.exports = class Server {
    constructor(token, user) {
        this.slack = new SlackAPI(token);
        this.user = user;
    }

    // find user ID from "users.list"
    findUserId() {
        return new Promise((resolve, reject) => {
            this.slack.users().then(data => { // get the user list
                for (let i=0; i < data.members.length; i++) {
                    if(data.members[i].profile.display_name && data.members[i].profile.display_name === this.user)
                        resolve(data.members[i].id);
                }
                reject('no matched userName found');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // return list of channels ids from "channels.list"
    findChannelsIds() {
        return new Promise((resolve, reject) => {
            this.slack.channels().then(data => {
                const list = [];

                for (let i=0; i < data.channels.length; i++) {
                    list.push(data.channels[i].id);
                }
                resolve(list);
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // single channel msgs fetch 
    // filter msg by <@UserName> in the text
    findChannelMsgs(channel_id, user_id){
        return new Promise((resolve, reject) => {
            this.slack.channelHistory(channel_id).then(data => {
                const pattern = `<@${user_id}>`;
                const msgs = [];

                for (let i=0; i < data.messages.length; i++) {
                    if(data.messages[i].text.includes(pattern))
                        msgs.push(data.messages[i]);
                }

                resolve(msgs);
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    findChannelsMsgsByUserId(channel_id_list, user_id){
        return new Promise(async (resolve, reject) => {
            let msgs = [];

            for (let i=0; i < channel_id_list.length; i++) {
                const data = await this.findChannelMsgs(channel_id_list[i], user_id);
                msgs = data.concat(msgs); 
            }
            resolve(msgs);
        });
    }
}