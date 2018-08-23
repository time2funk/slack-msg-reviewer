# slack-msg-reviewer
[ Node.js, Electron.js, slack ]

Desktop App (based on Electron.js) was design to review messages of specific user in slack worck-space.

// Design: slack-api--> slack-methods--> [data]--> app

# Set-Up Slack Bot
. First we need to create slack-bot for particular slack work-space

// We will receive slack-bot OAuth Access Token (xoxp-...)

. Select "Permission OAuth Scopes" for your slack-bot 

[channels:history, groups:history, im:history, mpim:history, channels:read, groups:read, im:read, mpim:read, users:read]

. Then we need to rewrite our config.js file in the app directory

# run app
npm start

# run tests
npm test

# deploy
npm package-mac

npm package-win

npm package-linux