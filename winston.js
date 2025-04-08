const winston = require("winston")

const logger = winston.createLogger({
    // level: 'info', // Default logging level
    transports: [
      // Log to the console
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(), // Colorize the output
          winston.format.simple() // Use simple format for logs
        )
      }),
      // Log to a file
    //   new winston.transports.File({ filename: 'app.log' })
    ]
  });

  module.exports = logger;