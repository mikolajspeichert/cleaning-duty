const SLACK_WEBHOOK = require('../../config/config')
const slack = require('slack-notify')(SLACK_WEBHOOK)

module.exports = (channel, name, duties) => {
  let content =
    `Hi ${name}!\n You got some work to do today! ` +
    `Please, do the following activities: \n`

  for (const duty of duties) {
    content += `${duty.name} \n`
  }
  slack.send({
    channel: `@${channel}`,
    icon_emoji: ':toilet:',
    username: 'Cleaning duty',
    text: content,
  })
}
