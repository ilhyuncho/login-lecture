// winston 로그 모듈 사용

//const winston = require("winston");
// or
const { createLogger, transports, format } = require("winston");
const { combine,timestamp, label, printf, json, simple, colorize} = format;

const printFormat =     printf(({ timestamp, label, level, message}) => {
    return `${timestamp} [${label}] ${level} : ${message} `;
});

const pringLogFormat = {
    //winston.format.colorize(),  // 순서가 중요함
    //winston.format.simple(),
    // or        
    // format.timestamp({
    //     format: "YYYY-MM-DD HH:mm:dd"
    // }),
    // format.json(),
    // or  
    file: combine(
        label({
            label : "file log",
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd"
        }),
        printFormat   
    ), 
    console: combine(
        colorize(),  // 순서가 중요함
        //simple()
        // or
        label({
            label : "console log",
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd"
        }),
        printFormat   
    ), 

};

const opts = {
    file : new transports.File({  
        filename : "access.log",
        dirname : "./logs",
        level : "info",
        format :pringLogFormat.file,
    }),
    console : new transports.Console({  
        level : "info",
        format :pringLogFormat.console,
    })
};

const logger = createLogger({
    // 콘솔에 로그 남기기
    // transports: [
    //     new transports.Console({  
    //         level : "info",
    //         format :pringLogFormat,
    // })],

    transports: [opts.file],
});

if(process.env.NODE_ENV !== "prod"){
    logger.add(opts.console);
}

module.exports = logger;