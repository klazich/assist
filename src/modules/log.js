
module.exports = function (dep) {
  let result = {}

  const { winston, resolve, join } = dep

  let logDir = resolve(__dirname, '..', '..', 'logs')

  let logger = new winston.Logger({
    transports: [
      new (winston.transports.Console)({
        level: 'debug',
        colorize: true,
        prettyPrint: true,
        showLevel: false
      }),
      new (winston.transports.File)({
        name: 'debug-file',
        level: 'debug',
        filename: join(logDir, 'filelog-debug.log'),
        colorize: true,
        prettyPrint: true
      }),
      new (winston.transports.File)({
        name: 'error-file',
        level: 'error',
        filename: join(logDir, 'filelog-error.log'),
        colorize: true,
        prettyPrint: true
      })
    ],
    exceptionHandlers: [
      new (winston.transports.Console)({
        colorize: true,
        prettyPrint: true,
        humanReadableUnhandledException: true
      }),
      new (winston.transports.File)({
        filename: join(logDir, 'exceptions.log'),
        humanReadableUnhandledException: true,
        prettyPrint: true
      })
    ]

  })

  logger.cli()

  result = logger

  return result
}
