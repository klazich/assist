module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'create <fileName>'
  cmd.desc = 'Scaffolding command to create a new module'
  cmd.builder = {
    command: {
      alias: 'c',
      describe: 'Create a command file'
    },
    mod: {
      alias: 'm',
      describe: 'Create a module file'
    },
    force: {
      alias: 'f',
      description: 'Force file overwrite'
    },
    debug: {
      alias: 'd',
      description: 'Log argv data'
    }
  }
  cmd.handler = function (argv) {
    const { fileName, command, mod, force, debug } = argv
    const { resolve, fs, createAssets, log } = dep

    if (debug) log.ger('debug', JSON.stringify(argv, null, 2))

    if (command) {
      let path = resolve(__dirname, '../commands', `${fileName}.js`)
      if (fs.existsSync(path) && !force) log.ger('warn', `file: '${fileName}.js' already exists @ /lib/commands. Use the 'force' flag (--force, -f) to overwrite`)
      else {
        fs.writeFile(path, createAssets.commandFile, (err) => {
          if (err) console.log('error', err)
          log.ger(null, `file: '${fileName}.j's created @ /lib/commands`)
        })
      }
    }

    if (mod) {
      let path = resolve(__dirname, '../modules', `${fileName}.js`)
      if (fs.existsSync(path) && !force) log.ger('warn', `file: '${fileName}.js' already exists @ /lib/modules. Use the 'force' flag (--force, -f) to overwrite`)
      else {
        fs.writeFile(path, createAssets.moduleFile, (err) => {
          if (err) console.log('error', err)
          log.ger(null, `file: '${fileName}.js' created @ /lib/modules`)
        })
      }
    }
  }

  return cmd
}
