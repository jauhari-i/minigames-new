import { transporter } from '../config/configureNodeMailer'
import fs from 'fs'
import handlebars from 'handlebars'
import path from 'path'
import { getConfig } from '../config/global_config'

const readHtmlFile = async path => {
  const html = fs.readFileSync(path, 'utf-8')
  if (!html) return false
  return html
}

const mode = getConfig('/mode')

export const sendVerificationEmail = async (email, token) => {
  const file = await readHtmlFile(
    path.join(__dirname, '../public/verificationEmail.html')
  )
  if (!file) {
    return false
  } else {
    const template = handlebars.compile(file)
    const data = {
      token: token,
      email: email,
      link:
        'https://minigame-infiniteroom.herokuapp.com/api/user/verify/' + token,
      linkRequest:
        'https://minigame-infiniteroom.herokuapp.com/api/user/request/' + token,
    }
    const localData = {
      token: token,
      email: email,
      link: 'http://localhost:9000/api/user/verify' + token,
      linkRequest: 'http://localhost:9000/api/user/request' + token,
    }
    const htmlToSend = template(mode === 'dev' ? localData : data)
    const mailOptions = {
      from: `"Minigames Infiniteroom" <minigames@tranceformasiindonesia.com>`,
      to: email,
      subject: 'Account Verification',
      html: htmlToSend,
    }

    const send = await transporter.sendMail(mailOptions)
    if (send) {
      return send
    } else {
      return false
    }
  }
}
