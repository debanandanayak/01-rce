const cp = require("child_process")
const util = require("util")
const syncExec = util.promisify(cp.exec)

const runCode = async (cmd) => {
  const op = await syncExec(cmd)
  return op
}

module.exports = runCode
