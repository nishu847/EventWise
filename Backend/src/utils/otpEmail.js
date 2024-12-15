import nodemailer from "nodemailer"

const sendEmail=async(email,subject,message)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'nishusharma.sharma2006@gmail.com',
            pass:'dtmh ftsg yuui fipp',
        }
    });

    const mailOptions={
        from:'nishusharma.sharma2006@gmail.com',
        to:email,
        subject:subject,
        text:message
    }
    await transporter.sendMail(mailOptions);
}

export default sendEmail