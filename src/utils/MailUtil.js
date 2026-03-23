const mailer = require("nodemailer")
require("dotenv").config()

const mailSend = async(to,subject,text)=>{

    const transporter = mailer.createTransport({
        service:"gmail",
        auth:{
            user:"pythonforsamir@gmail.com",
            pass:"khgh ilou rcbj zbhq"
            //user:process.env.EMAIL_USER,
            //pass:process.env.EMAIL_PASSWORD

        }
    })
    const mailOptions  = {
        to:to,
        subject:subject,
        //text:text
        html:text
    }
    const mailResponse = await transporter.sendMail(mailOptions)
    console.log(mailResponse)
    return mailResponse


}
module.exports = mailSend
