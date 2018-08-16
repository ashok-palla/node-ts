import * as nodemailer from "nodemailer";
import * as fs from "fs";
import * as log from "./logger/log";
const account: IAccount = { "user": "ashok_palla@merilytics.com", "pass": "" };
let transporter: any = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: { user: account.user, pass: account.pass }
});

export let sendMail = (receiversDetails): void => {
    fs.readFile("./template/error_mail.html", { encoding: "utf-8" }, (err, html) => {
        if (!err) { receiversDetails.html = html.replace("###MSG###", JSON.parse(receiversDetails.text)); }
        queueMail(receiversDetails);
    });
};

export let queueMail = (receiversDetails): void => {
    let mailOptions: object = {
        from: account.user, // sender address
        to: receiversDetails.to, // list of receivers
        subject: receiversDetails.subject, // subject line
        text: receiversDetails.html ? null : receiversDetails.text, // plain text body
        html: receiversDetails.html ? receiversDetails.html : null // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) { return log.errorLog(error); }
        log.writeLog(JSON.stringify(info));
    });
};
