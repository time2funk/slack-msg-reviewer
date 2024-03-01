# slack-msg-reviewer
[ Node.js, Electron.js, Slack, AWS Polly ]

Desktop App was design to review messages of specific user in slack worck-space.


# run app
npm start

# run tests
npm test

# deploy
npm package-mac

npm package-win

npm package-linux


# Configure
Create your oun "config.js" file from "comfig-sample.js"


# Set-Up Slack Bot
. First we need to create slack-bot for particular slack-work-space

// We will receive slack-bot OAuth Access Token (xoxp-...) ===> config.js

. Select "Permission OAuth Scopes" for your slack-bot 

[channels:history, groups:history, im:history, mpim:history, channels:read, groups:read, im:read, mpim:read, users:read]

. Then we need to rewrite our config.js file in the app directory


# Set-Up AWS Polly
. create AWS IAM User Account with Access Credentials (AmazonPollyFullAccess)

// we will receive "Access Key ID" and "Secret Access Key" ===> config.js

. Also we need to choose the "voice ID" form the list https://docs.aws.amazon.com/polly/latest/dg/voicelist.html ===> config.js

