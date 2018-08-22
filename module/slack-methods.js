const SlackAPI = require('./slack-api');
const utility = require('./utility');
const { customizer, filterMessages, replaceIds } = utility;

module.exports = class {
    constructor(token, user, sources) {
        this.slack = new SlackAPI(token);
        this.user = user;
        if(sources && sources.length > 0) 
            this.sources = sources;
    }

    setSources(sources){

        console.log('a');
        this.sources = sources;
    }

    // the Magic...
    // msg getter
    async getMsgs(){
        console.log('b');
        const mainUserId = await this.getUserId(this.user);
        const users = await this.slack.users();

        return new Promise(async (resolve, reject) => {
            let messages = [];

            if(this.sources.indexOf('channel') != -1)
                await this.getChannelIds().then( async ids => {
                    console.log(ids);
                    let tmp_msgs = [];

                    for(let i=0; i < ids.length; i++){
                        await this.getChannelMsgs(ids[i]).then(result => {
                            console.log(result);
                            tmp_msgs = tmp_msgs.concat(result);
                        });
                    }
                    messages = messages.concat(tmp_msgs);
                });

            // if(this.sources.indexOf('group') != -1)
            //     await this.getGroupMsgs().then(result => {
            //         messages = messages.concat(result);
            //     });
            
            // if(this.sources.indexOf('im') != -1)
            //     await this.getImMsgs().then(result => {
            //         messages = messages.concat(result);
            //     });
            
            // if(this.sources.indexOf('mpim') != -1)
            //     await this.getMpimMsgs().then(result => {
            //         messages = messages.concat(result);
            //     });
            
            resolve(messages);
        }).then(messages => {
            if(messages.length == 0) return [];

            // filter messages by Mentioned User Id
            messages = filterMessages(messages, mainUserId);

            // replace ids with user names
            messages = replaceIds(messages, users);

            // customize data befor send
            // cut unnecessary data
            // add time and date
            const data = customizer(messages);

            return data;
        });
    }

    // GET userId BY userName
    getUserId(name) {
        return new Promise((resolve, reject) => {
            this.slack.users().then(data => { // get the user list
                for (let i=0; i < data.members.length; i++) {
                    if(data.members[i].profile.display_name && data.members[i].profile.display_name === name)
                        resolve(data.members[i].id);
                }
                reject('no matched userName found');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // GET userName BY userId
    getUserName(id){
        return new Promise((resolve, reject) => {
            this.slack.users().then(data => { // get the user list
                for (let i=0; i < data.members.length; i++) {
                    if(data.members[i].id === id) // the user
                        if(data.members[i].profile && data.members[i].profile.display_name)
                            resolve(data.members[i].profile.display_name);
                        else
                            resolve(data.members[i].name);
                }
                reject('no matched userId found');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // GET IDS OF ALL
    // channels
    getChannelIds() {
        return new Promise((resolve, reject) => {
            this.slack.channels().then(data => {
                if (data.ok) {
                    const list = [];

                    for (let i=0; i < data.channels.length; i++) {
                        list.push(data.channels[i].id);
                    }
                    resolve(list);
                } else 
                    reject('response [channels.list] NOT OK');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // GET IDS OF ALL
    // private-channels
    getGroupIds() {
        return new Promise((resolve, reject) => {
            this.slack.groups().then(data => {
                if (data.ok) {
                    const list = [];

                    for (let i=0; i < data.usergroups.length; i++) {
                        list.push(data.usergroups[i].id);
                    }
                    resolve(list);
                } else 
                    reject('response [groups.list] NOT OK');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }
    
    // GET IDS OF ALL
    // direct-message-channels
    getImIds() {
        return new Promise((resolve, reject) => {
            this.slack.im().then(data => {
                if (data.ok) {
                    const list = [];

                    for (let i=0; i < data.ims.length; i++) {
                        list.push(data.ims[i].id);
                    }
                    resolve(list);
                } else 
                    reject('response [im.list] NOT OK');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // GET IDS OF ALL
    // multiparty-direct-message-channels
    getMpimIds() {
        return new Promise((resolve, reject) => {
            this.slack.mpim().then(data => {
                if (data.ok) {
                    const list = [];

                    for (let i=0; i < data.groups.length; i++) {
                        list.push(data.groups[i].id);
                    }
                    resolve(list);
                } else 
                    reject('response [mpim.list] NOT OK');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // FETCH MESSAGES FROM 
    // channel 
    getChannelMsgs(id){
        return new Promise((resolve, reject) => {
            this.slack.channelHistory(id).then(data => {
                if(data.ok) {
                    for(let i=0; i < data.messages; i++){
                        data.messages.source = "channel";
                    }
                    resolve(data.messages);
                }
                else 
                    reject('response [channel.history] NOT OK');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // FETCH MESSAGES FROM
    // private-channel
    getGroupMsgs(id){
        return new Promise((resolve, reject) => {
            this.slack.groupHistory(id).then(data => {
                if(data.ok) {
                    for(let i=0; i < data.messages; i++){
                        data.messages.source = "private-channel";
                    }
                    resolve(data.messages);
                }
                else 
                    reject('response [groups.history] NOT OK');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // FETCH MESSAGES FROM
    // direct-message-channel
    getImMsgs(id){
        return new Promise((resolve, reject) => {
            this.slack.imHistory(id).then(data => {
                if(data.ok) {
                    for(let i=0; i < data.messages; i++){
                        data.messages.source = "direct-message-channel";
                    }
                    resolve(data.messages);
                }
                else 
                    reject('response [im.history] NOT OK');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

    // FETCH MESSAGES FROM
    // multiparty-direct-message-channel
    getMpimMsgs(id){
        return new Promise((resolve, reject) => {
            this.slack.mpimHistory(id).then(data => {
                if(data.ok) {
                    for(let i=0; i < data.messages; i++){
                        data.messages.source = "multiparty-direct-message-channel";
                    }
                    resolve(data.messages);
                }
                else 
                    reject('response [groups.history] NOT OK');
            }).catch(e => {
                console.log(e);
                reject(e);
            });
        });
    }

}