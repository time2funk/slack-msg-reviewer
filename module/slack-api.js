const Slack = require('slack');

module.exports = class SlackAPI {
    constructor(token) {
        this.token = token;
        this.slack = Slack;
    }
    users() {
        return new Promise((resolve, reject) => {
            this.slack.users.list({
                token: this.token
            }, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            })
        });
    }
    channels() {
        return new Promise((resolve, reject) => {
            this.slack.channels.list({
                token: this.token
            }, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            })
        });
    }
    channelHistory(channel, latest) {
        return new Promise((resolve, reject) => {
            const params = {
                token: this.token,
                channel,
                latest
            }
            this.slack.channels.history(params, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            })
        });
    }
    getSelfData() {
        return new Promise((resolve, reject) => {
            this.slack.auth.test({
                token: this.token
            }, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res);
            })
        });
    }
}