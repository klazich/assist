module.exports = function (dep) {
  let result = {}

  const { winston, resolve, join, dir, color } = dep

  const tsFormat = () => (new Date()).toLocaleTimeString();
//https://thejsf.wordpress.com/2015/01/18/node-js-logging-with-winston/
  require('winston-daily-rotate-file')
 winston.remove(winston.transports.Console)
  winston.add(winston.transports.Console, {
    level: process.env.ENV === 'development' ? 'debug' : 'info',
    colorize: true,
    prettyPrint: true,
    // showLevel: false,
  })
  winston.add(winston.transports.DailyRotateFile, {
    level: process.env.ENV === 'development' ? 'debug' : 'info',
    filename: join(dir.root(__dirname), 'log/log'),
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    json: false,
    timestamp: tsFormat,
  })

winston.cli()

  // let logger = new winston.Logger({
  //   level: 'debug',
  //   transports: [
  //     new (winston.transports.DailyRotateFile)({
  //       filename: join(dir.root(__dirname), 'log/log'),
  //       datePattern: 'yyyy-MM-dd.',
  //       prepend: true,
  //       level: process.env.ENV === 'development' ? 'debug' : 'info',
  //       json: false,
  //       timestamp: tsFormat,
  //     }),
  //     new (winston.transports.Console)({
  //       colorize: true,
  //       prettyPrint: true,
  //       // showLevel: false,
  //     }),
  //     new (winston.transports.File)({
  //       filename: join(dir.root(__dirname), 'log/test.log'),
  //       level: process.env.ENV === 'development' ? 'debug' : 'info',
  //       json: false,
  //       timestamp: tsFormat,
  //       formatter: [
  //         function (level, msg, meta) { return msg.toUppercase() }
  //       ]
  //     })
  //   ],
  //   exitOnError: false
  // })

  // logger.cli()

  // logger.on('logging', function (transport, level, msg, meta) {
  //   // [msg] and [meta] have now been logged at [level] to [transport]
  //   setInterval(()=>{console.log("[%s] and [%s] have now been logged at [%s] to [%s]",
  //     msg, JSON.stringify(meta), level, transport.name);}, 5000)
  // });

  // result = logger

  return winston
}
