module.exports = function (dep) {
  let result

  const { fs, winston, resolve, join, dir, colors, _ } = dep

  require('winston-daily-rotate-file')
  winston.emitErrs = true


  if(!fs.existsSync(join(dir.root(__dirname), 'log'))) fs.mkdirSync(join(dir.root(__dirname), 'log'))

  let pre
  const tsFormat = () => {
    let stamp = `[${_.padEnd(process.pid + ']', 5)}\t${new Date().toLocaleTimeString()}`
    if (pre !== process.pid) stamp = '-'.repeat(100) + '\n' + stamp
    pre = process.pid
    return stamp
  }

  let logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: process.env.ENV === 'development' ? 'debug' : 'info',
        colorize: true,
        prettyPrint: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        showLevel: false
      }),
      new winston.transports.DailyRotateFile({
        level: 'debug',
        // label: process.pid,
        filename: join(dir.root(__dirname), 'log/log'),
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        json: false,
        timestamp: tsFormat,
        colorize: false,
        handleExceptions: true,
        prettyPrint: true
      })
    ],
    exitOnError: false
  })

  logger.cli()

  result = logger

  return result
}
