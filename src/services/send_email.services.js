import nodemailer from "nodemailer";

/**
 * @param {object} params - object of email params
 * @returns {Promise} - Promise object represents the info of the sent email
 * @description - Send email service
 */



export const sendEmailService = async ({
  to,
  subject = "No Reply",
  textMessage = "",
  htmlMessage = "",
  attachments = [],
} = {}) => {
  // configer email ( transporter)
  const transporter = nodemailer.createTransport({
    host: "localhost", // smtp.gmail.com
    port: 465, 
    secure: true, 
    auth: {
      user: "amirahh8742@gmail.com", 
      pass: "mklgllqcndmevogp",
    },
    service:"gmail",
    tls:{
        rejectUnauthorized:false,


    },

  });


  // configer message ( mail )
  const info = await transporter.sendMail({
    from: "No Reply <amirahh8742@gmail.com>",
    to: to ? to : "",
    subject,
    text: textMessage,
    html: htmlMessage,
    attachments,
  });
  
  return info;
};
