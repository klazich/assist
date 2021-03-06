module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'create <fileName>'
  cmd.desc = 'Scaffolding command to create a new module'
  cmd.builder = {
    command: {
      alias: 'c',
      describe: 'Create a command file in scaffolding'
    },
    mod: {
      alias: 'm',
      describe: 'Create a module file in scaffolding'
    },
    force: {
      alias: 'f',
      description: 'Force file overwrite'
    },
    deploy: {
      alias: 'd',
      description: 'Deploy file to cli tool'
    },
    debug: {
      description: 'Log argv data'
    }
  }
  cmd.handler = function (argv) {
    const { fileName, command, mod, force, deploy, debug } = argv
    const { resolve, join, fs, create, createAssets, log } = dep

    const root = resolve(__dirname, '..')

    let tasks = []

    if (command) {
      if (deploy) {
        tasks.push({
          option: 'deploy',
          oldPath: join(root, 'scaffolding', 'commands', `${fileName}.js`),
          path: join(root, 'commands', `${fileName}.js`),
          exists: fs.existsSync(join(root, 'commands', `${fileName}.js`))
        })
      } else {
        tasks.push({
          option: 'make',
          path: join(root, 'scaffolding', 'commands', `${fileName}.js`),
          data: createAssets.commandFile,
          exists: fs.existsSync(join(root, 'scaffolding', 'commands', `${fileName}.js`))
        })
      }
    }
    if (mod) {
      if (deploy) {
        tasks.push({
          option: 'deploy',
          oldPath: join(root, 'scaffolding', 'modules', `${fileName}.js`),
          path: join(root, 'modules', `${fileName}.js`),
          exists: fs.existsSync(join(root, 'modules', `${fileName}.js`))
        })
      } else {
        tasks.push({
          option: 'make',
          path: resolve(root, 'scaffolding', 'modules', `${fileName}.js`),
          data: createAssets.moduleFile,
          exists: fs.existsSync(join(root, 'scaffolding', 'modules', `${fileName}.js`))
        })
      }
    }

    tasks.forEach(o => {
      if (o.exists && !force) {
        return log.info(
          (`A file already exists at path:
  (use the 'force' flag (--force, -f) to overwrite)
          
          ${o.path}

The file was not created.`))
      }
      if (o.option === 'make') {
        create.file(o.path, o.data)
          .then(filePath => log.info(`created ${filePath}`))
          .catch(e => log.error(e))
      }
      if (o.option === 'deploy') {
        create.move(o.path, o.oldPath)
          .then(filePath => log.info(`created ${filePath}`))
          .catch(e => log.error(e))
      }
    })

    console.log()

    if (debug) log.debug(JSON.stringify(argv, null, 2))
  }

  return cmd
}
