import * as fs from "fs";
import * as mail from "../nodemailer";
const file_path: string = "./logger/logFiles/";

// if (!fs.existsSync(file_path)) { fs.mkdirSync(file_path); }

export let writeLog: any = (msg) => {
    const fileName: string = (new Date()).getFullYear() + "_" + getWeek() + ".log";
    fs.open(file_path + fileName, "a", (err, fd: any) => {
        if (err) { throw err; }
        fs.appendFile(fd, "\n" + new Date() + " : " + msg, { encoding: "utf-8" }, (err) => {
            fs.close(fd, (err) => { if (err) { throw err; } });
            if (err) { throw err; }
        });
    });
};
export let errorLog: any = (msg) => {
    fs.open(file_path + "error.log", "a", (err, fd: any) => {
        if (err) { throw err; }
        fs.appendFile(fd, "\n" + new Date() + " : " + msg, { encoding: "utf-8" }, (err) => {
            fs.close(fd, (err) => { if (err) { throw err; } });
            if (err) { throw err; }
        });
    });
    mail.sendMail({ to: "ashok_palla@merilytics.com", subject: "Error in LMS", text: JSON.stringify(msg) });
};
let getWeek: any = () => {
    let onejan: number = (new Date((new Date).getFullYear(), 0, 1)).getMilliseconds();
    let now: number = (new Date()).getMilliseconds();
    return Math.ceil(((now - onejan) / 86400000) / 7);
};
