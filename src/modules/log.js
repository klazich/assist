
module.exports = function (dep) {
  let result = {}

  const { winston, resolve, join } = dep

  let root = resolve(__dirname, '..', '..')

  let logger = new (winston.Logger)({
    level: 'debug',
    transports: [
      new (winston.transports.Console)({ colorize: true, prettyPrint: true, showLevel: false }),
      new (winston.transports.File)({ filename: join(root, '.log'), prettyPrint: true })
    ]
  });

  logger.cli()

  // logger.on('logging', function (transport, level, msg, meta) {
  //   // [msg] and [meta] have now been logged at [level] to [transport]
  //   setInterval(()=>{console.log("[%s] and [%s] have now been logged at [%s] to [%s]",
  //     msg, JSON.stringify(meta), level, transport.name);}, 5000)
  // });

  result = logger

  return result
}
