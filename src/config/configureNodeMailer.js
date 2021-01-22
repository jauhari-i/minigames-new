import * as nodemailer from 'nodemailer'
import { getConfig } from '../config/global_config'

const emailConfig = getConfig('/emailConfig')

export const transporter = nodemailer.createTransport({
  host: 'mail.tranceformasiindonesia.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: emailConfig.email, // generated ethereal user
    pass: emailConfig.password, // generated ethereal password
  },
})
