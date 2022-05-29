
const fs = require("fs");
const appRoot = require("app-root-path");   // root 경로 가져와주는 모듈

const accessLogStream = fs.createWriteStream(
    `${appRoot}/log/access.log`,
    {flags:"a"}
);

module.exports = accessLogStream;