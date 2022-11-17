const express = require('express')
const cors = require('cors')
const os = require('node:os')
const fs = require('node:fs')
const path = require('node:path')

const userOsInfo = require('./components/userOsInfo/osInfo.js')
const homeDir = os.homedir()

const pathName = '/'
const port = process.env.PORT || 3000

const app = express()
app.use(cors())

app.get(
    pathName,
    (req, res)=>
    {

        fs.readdir(
            homeDir,
            (err, files)=> 
            {
                if(err) return console.error(`${err.code}: ${err.message}`)

                const homeDirFiles = []
                files.forEach(
                    file => homeDirFiles.push(
                        {
                            title: file,
                            extName: path.extname(file)
                        }
                    )
                )

                res.send([userOsInfo(), homeDirFiles])
            }
        )
    }
)

app.listen(
    port, 
    () => console.log(`Express app listening on port ${port}`)
)