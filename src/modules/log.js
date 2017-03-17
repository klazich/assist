module.exports = function (dep) {
  let result

  const { fs, winston, resolve, join, dir, colors, _, util } = dep

  require('winston-daily-rotate-file')
  winston.emitErrs = true


  if (!fs.existsSync(join(dir.root(__dirname), 'log'))) fs.mkdirSync(join(dir.root(__dirname), 'log'))

  let pre
  const tsFormat = () => {
    let stamp = `[${_.padEnd(process.pid + ']', 5)}\t${new Date().toLocaleTimeString()}`
    if (pre !== process.pid) stamp = '-'.repeat(125) + '\n' + stamp
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
      new winston.transports.File({
        level: 'debug',
        // label: process.pid,
        filename: join(dir.root(__dirname), 'log', 'all.log'),
        json: false,
        timestamp: tsFormat,
        colorize: false,
        handleExceptions: true,
        prettyPrint: true,
        // formatter: function (options) {
        //   // Return string will be passed to logger.
        //   return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message ? options.message : '') +
        //     (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
        // }
      }),
      new winston.transports.DailyRotateFile({
        level: 'debug',
        label: process.pid,
        filename: join(dir.root(__dirname), 'log/json/log'),
        datePattern: 'yyyy-MM-dd.',
        prepend: true,
        handleExceptions: true,
      })
    ],
        exceptionHandlers: [
          new winston.transports.File({
            filename: join(dir.root(__dirname), 'log', 'exceptions.log'),
 
        json: false,
        timestamp: tsFormat,
        colorize: false,
        handleExceptions: true,
        prettyPrint: true,
          })
    ],
    exitOnError: false
  })


  // logger.rewriters.push(function (level, msg, meta) {
  //   const indent = 34
  //   const s = '\n' + ' '.repeat(indent)
  //   if (meta && Object.keys(meta).length) {
  //     return '----------' + s + util.inspect(meta, { depth: 3 }).replace(/\n/g, s)
  //   }
  // })

  logger.cli()

  result = logger

  result.object = (title, obj) => {

    let indt = title.length + 5

    //logger.debug('-'.repeat(96))

    util.inspect(obj).split('\n').forEach((e, i) => {
      if (i === 0) logger.debug(title + ' ->  ' + e)
      else logger.debug(' '.repeat(indt) + e)
    })
  }

  return result
}
