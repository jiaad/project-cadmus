import nodemailer from 'nodemailer'

exports.sendEmail = async (informations) => {
  // let testAccount = await nodemailer.createTestAccount()

  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '25f146a026d789',
      pass: '422ab595e564be',
    },
  })

  const message = {
    from: `"jiad 😍" <jiad@gmail.com>`,
    to: informations.email,
    subject: informations.subject,
    text: informations.text,
    html: informations.html,
  }
  const info = await transport.sendMail(message)

  console.log('Message sent :', info.messageId)
  console.log('Message sent :', nodemailer.getTestMessageUrl(info))
}
