const slack_token = process.env.SLACK_BOT_TOKEN ? process.env.SLACK_BOT_TOKEN : 'xoxp-...';
const slack_user_name = process.env.SLACK_USER ? process.env.SLACK_USER : 'slack_user_name';

module.exports = {
	slack: {
		user: slack_user_name,
		token: slack_token
	}
}