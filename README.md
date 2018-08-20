# slack-msg-reviewer
Node.js, Electron.js, slack

Desktop App (based on Electron.js) to review messages of specific user in slack worck-space.
// Design: slack-api--> slack-methods--> [data]--> app

# Set-Up Slack Bot
. First we need to create slack-bot for particular slack work-space
// We will receive slack-bot OAuth Access Token (xoxp-...)
.. Select [channels:history, channels:read, users:read] under your Permission OAuth Scopes

. Then we need to rewrite our config.js file in the app directory

# run app
npm start

# run tests
npm test