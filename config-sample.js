const slack_token = process.env.SLACK_BOT_TOKEN 
	? process.env.SLACK_BOT_TOKEN 
	: 'xoxp-...';
const slack_user_name = process.env.SLACK_USER 
	? process.env.SLACK_USER 
	: 'slack_user_name';

const polly_access_key = process.env.POLLY_ACCESS_KEY 
	? process.env.POLLY_ACCESS_KEY 
	: '***';
const polly_secret_key = process.env.POLLY_SECRET_KEY 
	? process.env.POLLY_SECRET_KEY 
	: '***';

module.exports = {
	slack: {
		user: slack_user_name,
		token: slack_token
	},
	polly: {
		auth: {
			accessKeyId: polly_access_key,
			secretAccessKey: polly_secret_key,
	 		region: "***",
			version: "latest"
		},
		voice: {
			id: "Joanna"
		}
	}
}