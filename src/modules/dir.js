module.exports = function (dep) {
  let result = {}

  const { resolve, fs } = dep

  result.root = (directory = __dirname, limit = 3) => {
    // todo: check that cwd is a valid path

    let dirs = Array.from({ length: limit }, (v, i) => ({
      path: resolve(directory, ...Array.from({ length: i }, () => '..')),
      files: fs.readdirSync(resolve(directory, ...Array.from({ length: i }, () => '..')))
    }))

    let found = dirs.find(v => v.files.includes('package.json')).path

    return found
  }

  return result
}
