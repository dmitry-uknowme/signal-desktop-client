const fs = require('fs')
const isDev = process.env.NODE_ENV === 'development'

const executableName = isDev
  ? 'dev-signal-desktop-client'
  : 'signal-desktop-client'
const packageName = isDev
  ? 'Dev Signal Desktop Client'
  : 'Signal Desktop Client'

const content = JSON.parse(fs.readFileSync('package.json', 'utf8'))
content.name = executableName
content.config.forge.packagerConfig.executableName = executableName
content.description = packageName
content.config.forge.packagerConfig.name = packageName
// isDev && content.version = content.version
fs.writeFileSync('package.json', JSON.stringify(content, null, 2))
