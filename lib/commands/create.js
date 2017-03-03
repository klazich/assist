'use strict'

module.exports = function (dep) {
  let cmd = {}

  cmd.command = 'create <moduleName>'
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
    }
  }
  cmd.handler = function (argv) {
    const { moduleName, command, mod } = argv
    const { join, fs, createAssets } = dep

    let data, fileDst

    if (command) {
      data = createAssets.commandFile
      fileDst = join(__dirname, '../commands', `${moduleName}.js`)
    } else if (mod) {
      data = createAssets.moduleFile
      fileDst = join(__dirname, '../modules', `${moduleName}.js`)
    }

    fs.writeFile(fileDst, data, (err) => {
      if (err) console.log(err.stack)
    })
  }

  return cmd
}
