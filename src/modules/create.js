module.exports = function (dep) {
  let result = {}

  const { fs, createAssets } = dep

  result.file = (filePath, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, data, (err) => {
        if (err) reject(err)
        resolve(filePath)
      })
    })
  }

  result.move = (newPath, oldPath) => {
    return new Promise((resolve, reject) => {
      fs.rename(oldPath, newPath, (err) => {
        if (err) reject(err)
        resolve(newPath)
      })
    })
  }

  return result
}