const os = require('node:os')

function getOsInfo(workingDirectory){
    const osInfo = 
    {
        'host name': os.hostname(),
        'user name': os.userInfo().username, 
        'home directory': os.homedir(), 
        'os platform': os.platform(), 
        'os type': os.type(), 
        'os architecture': os.arch(),
        'working directory': workingDirectory
    } 
   return osInfo
}

process.on(
    'uncaughtException',
    err => {
        if(err) {
            console.error(`Uncaught exception detected - ${err.code}: ${err.message}!`)
            return process.exitCode = 1
        }
    }
)

module.exports = getOsInfo