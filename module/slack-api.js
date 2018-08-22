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

    // channels
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

    // team's user group
    groups() {
        return new Promise((resolve, reject) => {
            this.slack.groups.list({
                token: this.token
            }, (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    }
    groupHistory(channel, latest) {
        return new Promise((resolve, reject) => {
            const params = {
                token: this.token,
                channel,
                latest
            }
            this.slack.groups.history(params, (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    }

    // direct messages
    im() {
        return new Promise((resolve, reject) => {
            this.slack.im.list({
                token: this.token
            }, (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    }
    imHistory(channel, latest) {
        return new Promise((resolve, reject) => {
            const params = {
                token: this.token,
                channel,
                latest
            }
            this.slack.im.history(params, (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    }

    // multiparty direct message
    mpim() {
        return new Promise((resolve, reject) => {
            this.slack.mpim.list({
                token: this.token
            }, (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    }
    mpimHistory(channel, latest) {
        return new Promise((resolve, reject) => {
            const params = {
                token: this.token,
                channel,
                latest
            }
            this.slack.mpim.history(params, (err, res) => {
                if (err)
                    reject(err)
                else
                    resolve(res)
            })
        })
    }

    // connection test
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