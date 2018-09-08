const { createLogger, format, transports } = require('winston');

const myCustomFormat = format.printf(info => {

    let colorString;
    switch (info.level) {
        case 'info':
            colorString = '\x1b[34m';
            break;
        case 'error':
            colorString = '\x1b[31m';
            break;
        default:
            colorString = '\x1b[0m';
            break;
    }

    const timestamp = `${new Date().toISOString()}`;
    const logLevel = `${info.level}`;

    const colorResetString = '\x1b[0m';

    const callingFile = new Error().stack.split('\n')[10];
    const callingFileFullPathAndLineNumber = callingFile.split(/\(|\)/)[1];
    const callingFileNameAndLineNumber = callingFileFullPathAndLineNumber.split('/').pop();

    const stringifiedMessage = JSON.stringify(info.message, null, '  ');

    return `${colorString}${timestamp} - ${logLevel}: [${callingFileNameAndLineNumber}] ${stringifiedMessage}${colorResetString}`;
});

const logger = createLogger({
  format: myCustomFormat,
  transports: [new transports.Console()]
});

module.exports = logger;