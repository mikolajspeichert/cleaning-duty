const SLACK_WEBHOOK = require('../../config/config')
const slack = require('slack-notify')(SLACK_WEBHOOK)

module.exports.morning = (channel, name, duties) => {
  let content =
    `Hi ${name}!\nYou got some work to do today! ` +
    `Please, do the following activities: \n`

  for (const duty of duties) {
    content += `${duty.name} \n`
  }

  content +=
    `\nYou feel like doing too much? <http://node.thinksmart.pl:3000|Check it> \n` +
    ` (Only available from the thinksmart office wifi)`

  slack.send({
    channel: `@${channel}`,
    icon_emoji: ':toilet:',
    username: 'Cleaning duty',
    text: content,
  })
}

module.exports.afternoon = (channel, name, duties, id) => {
  let content = `Hi ${name}!\nMay I remind you about something? Your duties: \n`
  for (const duty of duties) {
    content += `${duty.name} \n`
  }
  content += `\nIf you want to change the hour of your notifications, <http://node.thinksmart.pl:3000/user/${id}|go here>`
  let attachments = [
    {
      fallback:
        'If you want to stop the notifications, <http://node.thinksmart.pl:3000|go here>',
      title: 'I did it!',
      title_link: `http://node.thinksmart.pl:3000/api/done/${id}`,
    },
  ]

  slack.send({
    channel: `@${channel}`,
    icon_emoji: ':toilet:',
    username: 'Cleaning duty',
    text: content,
    attachments,
  })
}
